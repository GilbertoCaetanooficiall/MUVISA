import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { apiLimiter } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/db';
import { uploadSchema } from '@/lib/validations';
import { registarAuditoria } from '@/lib/audit';

// Magic bytes para verificação real do tipo de ficheiro
const MAGIC_BYTES: Record<string, Uint8Array> = {
  'application/pdf': new Uint8Array([0x25, 0x50, 0x44, 0x46]),  // %PDF
  'image/jpeg': new Uint8Array([0xff, 0xd8, 0xff]),              // JPEG
  'image/png': new Uint8Array([0x89, 0x50, 0x4e, 0x47]),        // PNG
  'image/webp': new Uint8Array([0x52, 0x49, 0x46, 0x46]),       // RIFF (WebP)
};

function getFileExtension(tipo: string): string {
  const map: Record<string, string> = {
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };
  return map[tipo] ?? 'bin';
}

function verifyMagicBytes(buffer: Uint8Array, declaredType: string): boolean {
  const magic = MAGIC_BYTES[declaredType];
  if (!magic) return false;
  return magic.every((byte, i) => buffer[i] === byte);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  // Rate limiting
  const { success: rateLimitOk } = apiLimiter.check(ip);
  if (!rateLimitOk) {
    return NextResponse.json({ error: 'Rate limit excedido.' }, { status: 429 });
  }

  // Verificar sessão
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const documentoId = formData.get('documento_id') as string | null;
    const nome = formData.get('nome') as string | null;

    if (!file || !documentoId || !nome) {
      return NextResponse.json({ error: 'Campos obrigatórios em falta.' }, { status: 400 });
    }

    // Validação Zod
    const parsed = uploadSchema.safeParse({
      nome,
      tamanho: file.size,
      tipo: file.type,
      documento_id: documentoId,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Ficheiro inválido', detalhes: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Verificar magic bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    if (!verifyMagicBytes(buffer, parsed.data.tipo)) {
      return NextResponse.json(
        { error: 'O tipo real do ficheiro não corresponde ao tipo declarado.' },
        { status: 400 }
      );
    }

    let actualDocumentoId = documentoId;
    let actualProcessoId = formData.get('processo_id') as string | null;

    if (documentoId === 'novo') {
      if (!actualProcessoId) {
        return NextResponse.json({ error: 'processo_id obrigatório para novos documentos.' }, { status: 400 });
      }
      // Verificar ownership do processo
      const { data: processo } = await supabaseAdmin
        .from('processo')
        .select('id, estudante_id')
        .eq('id', actualProcessoId)
        .single();
        
      const { data: estudante } = await supabaseAdmin
        .from('estudante')
        .select('utilizador_id')
        .eq('id', processo?.estudante_id)
        .single();

      if (estudante?.utilizador_id !== session.user.id) {
        return NextResponse.json({ error: 'Acesso negado ao processo.' }, { status: 403 });
      }

      // Criar o documento
      const { data: novoDoc, error: errCriar } = await supabaseAdmin
        .from('documento')
        .insert({
          processo_id: actualProcessoId,
          nome: parsed.data.nome,
          estado: 'enviado',
          enviado_em: new Date().toISOString()
        })
        .select('id')
        .single();

      if (errCriar || !novoDoc) {
        return NextResponse.json({ error: 'Erro ao criar registo de documento.' }, { status: 500 });
      }
      actualDocumentoId = novoDoc.id;
    } else {
      // Verificar que o documento existe e pertence ao utilizador
      const { data: documento, error: errDoc } = await supabaseAdmin
        .from('documento')
        .select('id, processo_id')
        .eq('id', documentoId)
        .single();

      if (errDoc || !documento) {
        return NextResponse.json({ error: 'Documento não encontrado.' }, { status: 404 });
      }
      
      actualProcessoId = documento.processo_id;

      // Verificar ownership do processo
      const { data: processo } = await supabaseAdmin
        .from('processo')
        .select('id, estudante_id')
        .eq('id', actualProcessoId)
        .single();

      const { data: estudante } = await supabaseAdmin
        .from('estudante')
        .select('utilizador_id')
        .eq('id', processo?.estudante_id)
        .single();

      if (estudante?.utilizador_id !== session.user.id) {
        return NextResponse.json({ error: 'Acesso negado ao documento.' }, { status: 403 });
      }
    }

    // Nome de ficheiro gerado pelo servidor
    const ext = getFileExtension(parsed.data.tipo);
    const timestamp = Date.now();
    const storagePath = `${session.user.id}/${actualDocumentoId}/${timestamp}.${ext}`;

    // Upload para Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('documentos')
      .upload(storagePath, buffer, {
        contentType: parsed.data.tipo,
        upsert: false,
      });

    if (uploadError) {
      console.error('[upload] Erro no storage:', uploadError);
      return NextResponse.json({ error: 'Erro ao fazer upload do ficheiro.' }, { status: 500 });
    }

    // Obter URL pública
    const { data: publicUrl } = supabaseAdmin.storage
      .from('documentos')
      .getPublicUrl(storagePath);

    // Actualizar documento na BD
    await supabaseAdmin
      .from('documento')
      .update({
        ficheiro_url: publicUrl.publicUrl,
        estado: 'enviado',
        enviado_em: new Date().toISOString(),
      })
      .eq('id', actualDocumentoId);

    await registarAuditoria({
      utilizadorId: session.user.id,
      acao: 'upload_ficheiro',
      detalhes: { documento_id: documentoId, nome: parsed.data.nome, tipo: parsed.data.tipo, tamanho: parsed.data.tamanho },
      ip,
      userAgent,
    });

    return NextResponse.json({
      message: 'Documento enviado com sucesso.',
      url: publicUrl.publicUrl,
    });
  } catch (err) {
    console.error('[upload] Erro inesperado:', err);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { apiLimiter } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/db';
import { createStaffSchema } from '@/lib/validations';
import { registarAuditoria } from '@/lib/audit';

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

  // Verificar sessão — só senior_admin
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== 'senior_admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = createStaffSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nome_completo, email, telefone, role, cargo, password } = parsed.data;

    // Verificar email duplicado
    const { data: existente } = await supabaseAdmin
      .from('utilizador')
      .select('id')
      .eq('email', email)
      .single();

    if (existente) {
      return NextResponse.json({ error: 'Email já registado.' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    // Criar utilizador
    const { data: novoUtilizador, error: errUtilizador } = await supabaseAdmin
      .from('utilizador')
      .insert({ nome_completo, email, telefone, password_hash, role, ativo: true })
      .select('id')
      .single();

    if (errUtilizador || !novoUtilizador) {
      return NextResponse.json({ error: 'Erro ao criar utilizador.' }, { status: 500 });
    }

    // Criar perfil de staff
    const { error: errStaff } = await supabaseAdmin.from('staff').insert({
      utilizador_id: novoUtilizador.id,
      cargo,
      ativo: true,
    });

    if (errStaff) {
      await supabaseAdmin.from('utilizador').delete().eq('id', novoUtilizador.id);
      return NextResponse.json({ error: 'Erro ao criar perfil de staff.' }, { status: 500 });
    }

    await registarAuditoria({
      utilizadorId: session.user?.id,
      acao: 'staff_criado',
      detalhes: { email, role, cargo, criado_por: session.user?.id },
      ip,
      userAgent,
    });

    return NextResponse.json({ message: 'Staff criado com sucesso.', id: novoUtilizador.id }, { status: 201 });
  } catch (err) {
    console.error('[register-admin] Erro:', err);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}

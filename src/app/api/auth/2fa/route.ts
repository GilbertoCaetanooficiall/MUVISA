import { NextRequest, NextResponse } from 'next/server';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/db';
import { registarAuditoria } from '@/lib/audit';

/** POST — Gera segredo TOTP e QR code */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  try {
    const secret = speakeasy.generateSecret({
      name: `MUVISA (${session.user.email})`,
      length: 20,
    });

    // Guardar segredo na BD (ainda não activo)
    const { error } = await supabaseAdmin
      .from('utilizador')
      .update({ two_factor_secret: secret.base32 })
      .eq('id', session.user.id);

    if (error) {
      return NextResponse.json({ error: 'Erro ao guardar segredo 2FA.' }, { status: 500 });
    }

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    return NextResponse.json({ secret: secret.base32, qrCode: qrCodeUrl });
  } catch (err) {
    console.error('[2fa POST] Erro:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}

/** PUT — Verifica código e activa 2FA */
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Token obrigatório.' }, { status: 400 });
    }

    // Buscar segredo
    const { data: utilizador } = await supabaseAdmin
      .from('utilizador')
      .select('two_factor_secret')
      .eq('id', session.user.id)
      .single();

    if (!utilizador?.two_factor_secret) {
      return NextResponse.json({ error: '2FA não configurado. Gere primeiro o QR code.' }, { status: 400 });
    }

    const valido = speakeasy.totp.verify({
      secret: utilizador.two_factor_secret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!valido) {
      return NextResponse.json({ error: 'Código inválido.' }, { status: 400 });
    }

    await supabaseAdmin
      .from('utilizador')
      .update({ two_factor_ativo: true })
      .eq('id', session.user.id);

    await registarAuditoria({
      utilizadorId: session.user.id,
      acao: '2fa_ativado',
      ip,
      userAgent,
    });

    return NextResponse.json({ message: '2FA activado com sucesso.' });
  } catch (err) {
    console.error('[2fa PUT] Erro:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}

/** DELETE — Desactiva 2FA */
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  try {
    await supabaseAdmin
      .from('utilizador')
      .update({ two_factor_ativo: false, two_factor_secret: null })
      .eq('id', session.user.id);

    await registarAuditoria({
      utilizadorId: session.user.id,
      acao: '2fa_desativado',
      ip,
      userAgent,
    });

    return NextResponse.json({ message: '2FA desactivado.' });
  } catch (err) {
    console.error('[2fa DELETE] Erro:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}

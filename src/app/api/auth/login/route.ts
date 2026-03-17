import { NextRequest, NextResponse } from 'next/server';
import { loginLimiter } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1';

  const { success, remaining, reset } = loginLimiter.check(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas tentativas. Tente novamente em 15 minutos.' },
      {
        status: 429,
        headers: {
          'Retry-After': '900',
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(reset),
        },
      }
    );
  }

  // A autenticação real é tratada pelo NextAuth via /api/auth/callback/credentials
  return NextResponse.json(
    { remaining },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  );
}

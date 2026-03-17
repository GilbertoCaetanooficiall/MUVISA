import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.supabase.co",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-src https://www.google.com/recaptcha/",
    "object-src 'none'",
  ].join('; '),
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export default auth(function middleware(request: NextRequest & { auth: unknown }) {
  const { pathname } = request.nextUrl;
  const session = (request as { auth?: { user?: { role?: string } } }).auth;
  const userRole = session?.user?.role;
  const isAuthenticated = !!session;

  // ── Protecção do Portal do Estudante ──────────────────────────────────────
  if (pathname.startsWith('/portal-estudante')) {
    if (!isAuthenticated || userRole !== 'estudante') {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      const response = NextResponse.redirect(url);
      return applySecurityHeaders(response);
    }
  }

  // ── Protecção do Portal Admin ─────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated || !['admin', 'senior_admin'].includes(userRole ?? '')) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth-admin/login';
      const response = NextResponse.redirect(url);
      return applySecurityHeaders(response);
    }
  }

  // ── Redirecionar utilizadores já autenticados ─────────────────────────────
  const publicAuthRoutes = ['/login', '/cadastro', '/auth-admin/login'];
  if (isAuthenticated && publicAuthRoutes.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone();
    if (userRole === 'estudante') {
      url.pathname = '/portal-estudante/home';
    } else {
      url.pathname = '/admin/dashboard';
    }
    const response = NextResponse.redirect(url);
    return applySecurityHeaders(response);
  }

  // ── Aplicar headers de segurança em todas as respostas ───────────────────
  const response = NextResponse.next();
  return applySecurityHeaders(response);
});

export const config = {
  matcher: [
    // Incluir todas as rotas excepto ficheiros estáticos e internos do Next.js
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

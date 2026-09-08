import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_COOKIE, isSessionValid } from './lib/auth';

/** Пускает в /admin только с валидной сессией, иначе — на форму входа. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await isSessionValid(token)) return NextResponse.next();

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

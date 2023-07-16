import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname, searchParams } = req.nextUrl;
  const authenticated = session !== null;

  //NOTE: 로그인 상태에서 메인 페이지로 접근하면 대시보드로 리다이렉트
  if (pathname === '/' && authenticated === true) {
    return redirectToDashboard();
  } //NOTE: 로그아웃 상태에서는 메인 페이지만 접근 가능
  else if (tryToAccessProtectedRoute() && authenticated === false) {
    return redirectToMain();
  }

  //NOTE: 로그인 상태에서 로그인 페이지로 접근하면 메인 페이지로 리다이렉트
  if (pathname === '/auth/signin' && authenticated === true) {
    return redirectToMain();
  } //NOTE: 로그아웃 상태에서 로그아웃 페이지로 접근하면 메인 페이지로 리다이렉트
  else if (pathname === '/auth/signout' && authenticated === false) {
    return redirectToMain();
  }

  ////////////////////////////////functions////////////////////////////////
  function redirectToMain() {
    return NextResponse.redirect(new URL('/', req.url));
  }
  function redirectToDashboard() {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  function tryToAccessProtectedRoute() {
    return pathname.startsWith('/') && pathname.length > 1;
  }
  /////////////////////////////////////////////////////////////////////////
}

export const config = {
  matcher: ['/', '/dashboard', '/auth/signin', '/auth/signout', '/search:path*']
};

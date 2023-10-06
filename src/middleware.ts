import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

////////////////////////////////functions////////////////////////////////
function redirectToMain(req: NextRequest) {
  return NextResponse.redirect(new URL('/', req.url));
}
function redirectToDashboard(req: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
function tryToAccessProtectedRoute(pathname: string) {
  return pathname.startsWith('/') && pathname.length > 1;
}
/////////////////////////////////////////////////////////////////////////

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;
  const authenticated = !!session;

  if (authenticated === true) {
    //NOTE: 로그인 상태에서 메인 페이지로 접근하면 대시보드로 리다이렉트
    if (pathname === '/') {
      return redirectToDashboard(req);
    }
    //NOTE: 로그인 상태에서 로그인 페이지로 접근하면 메인 페이지로 리다이렉트F
    if (pathname === '/auth/signin') {
      return redirectToMain(req);
    }
  } else if (authenticated === false) {
    //NOTE: 로그아웃 상태에서는 메인 페이지만 접근 가능
    if (tryToAccessProtectedRoute(pathname)) {
      return redirectToMain(req);
    }
    //NOTE: 로그아웃 상태에서 로그아웃 페이지로 접근하면 메인 페이지로 리다이렉트
    if (pathname === '/auth/signout') {
      return redirectToMain(req);
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/classroom',
    '/auth/signin',
    '/auth/signout',
    '/search/:path*',
    '/course/:path*'
  ]
};

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');
  const { pathname } = req.nextUrl;

  // Những route được phép truy cập khi chưa login
  const publicRoutes = [
    '/',
    '/about',
    '/login',
    '/create-account',
    '/forgot-password',
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  // Chưa đăng nhập và truy cập route không public
  if (!refreshToken?.value && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Đã đăng nhập thì không cho quay lại các trang auth
  const authRoutes = ['/login', '/create-account', '/forgot-password'];

  if (refreshToken?.value && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',
  ],
};

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { i18nConfig } from './i18n/config';

export async function middleware(req: NextRequest) {
  // Kiểm tra accessToken hoặc thông tin xác thực
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');
  const locale = req.cookies.get('locale')?.value || 'en';

  const authScreens = ['/login', '/create-account', '/forgot-password'];
  const noAlowAccess = ['/new-post'];
  const { pathname } = req.nextUrl;

  // // nếu không có locale -> redirect sang /en hoặc /vi
  // const pathLocale = pathname.split('/')[1];
  // if (!i18nConfig.locales.includes(pathLocale)) {
  //   return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  // }

  // Nếu không có accessToken và người dùng đang cố truy cập vào các trang không phải trang auth
  if (
    !accessToken?.value &&
    !authScreens.includes(pathname) &&
    noAlowAccess.includes(pathname)
  ) {
    // Chuyển hướng về trang đăng nhập
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    accessToken?.value &&
    authScreens.includes(pathname) &&
    !noAlowAccess.includes(pathname)
  ) {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng về trang chính
  }

  // Nếu đã xác thực, cho phép tiếp tục
  return NextResponse.next();
}

// Định nghĩa các route mà middleware sẽ áp dụng
export const config = {
  matcher: [
    '/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',
  ],
};

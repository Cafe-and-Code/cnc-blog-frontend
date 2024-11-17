import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

// Giả sử bạn lưu thông tin xác thực trong cookie hoặc sessionStorage
export function middleware(req: NextRequest) {
  // Kiểm tra token hoặc thông tin xác thực
  const token = req.cookies.get('token'); // Thay đổi theo cách bạn lưu trữ token
  const authScreens = ['/login', '/create-account', '/forgot-password']
  const autoAccess = ['/blog']
  // Nếu không có token và người dùng đang cố truy cập vào các trang không phải trang auth
  if (!token && !authScreens.includes(req.nextUrl.pathname) && !autoAccess.includes(req.nextUrl.pathname)) {
    // Chuyển hướng về trang đăng nhập
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && authScreens.includes(req.nextUrl.pathname) && autoAccess.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng về trang chính
  }

  // Nếu đã xác thực, cho phép tiếp tục
  return NextResponse.next();
}

// Định nghĩa các route mà middleware sẽ áp dụng
export const config = {
  matcher: ['/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',],
};
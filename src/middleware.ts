import { NextResponse } from 'next/server';

// Giả sử bạn lưu thông tin xác thực trong cookie hoặc sessionStorage
export function middleware(req:any) {
  // Kiểm tra token hoặc thông tin xác thực
  const token = req.cookies.get('token'); // Thay đổi theo cách bạn lưu trữ token
    
  // Nếu không có token và người dùng đang cố truy cập trang home
  if (!token && req.nextUrl.pathname !== '/login') {
    // Chuyển hướng về trang đăng nhập
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng về trang chính
  }

  // Nếu đã xác thực, cho phép tiếp tục
  return NextResponse.next();
}

// Định nghĩa các route mà middleware sẽ áp dụng
export const config = {
  matcher: ['/', '/login'], // Thay đổi theo các route bạn muốn bảo vệ
};
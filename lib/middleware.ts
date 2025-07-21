import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === 'login';

  // ✅ If user is logged in and trying to access login page, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('dashboard', req.url));
  }

  // ❌ If user is not logged in and tries to access /admin routes, redirect to login
  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

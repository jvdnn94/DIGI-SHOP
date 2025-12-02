import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    return NextResponse.next();
  } else {
    const newURL = new URL(request.url);
    newURL.pathname = "/login";
    return NextResponse.redirect(newURL);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

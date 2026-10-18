import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Protect checkout and orders routes
  if ((pathname.startsWith("/checkout") || pathname.startsWith("/orders")) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login"; // Using /login as per app's existing structure
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};

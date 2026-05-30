import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_COOKIE = "atelier_admin_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_COOKIE)?.value;
  const token = session ?? null;

  if (pathname.startsWith("/admin/login")) {
    if (token) {
      const existing = await prisma.adminSession.findUnique({
        where: { token },
        include: { adminUser: true },
      });
      if (existing && existing.adminUser?.isActive && existing.expiresAt > new Date()) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const existing = await prisma.adminSession.findUnique({
    where: { token },
    include: { adminUser: true },
  });

  if (!existing || !existing.adminUser?.isActive || existing.expiresAt <= new Date()) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
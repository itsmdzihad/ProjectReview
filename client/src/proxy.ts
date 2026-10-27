import { userServices } from "@/services/user.services";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/registration";
  const cookieHeader = request.headers.get("cookie") ?? "";

  if (!request.cookies.has("accessToken")) {
    return isAuthPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const { data: user } = await userServices.getSession(cookieHeader);

  if (!user) {
    return isAuthPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isStudentPath = pathname === "/student" || pathname.startsWith("/student/");
  const isMentorPath = pathname === "/mentor" || pathname.startsWith("/mentor/");

  if (user.role === "MENTOR" && isStudentPath) {
    return NextResponse.redirect(new URL("/mentor/dashboard", request.url));
  }

  if (user.role === "STUDENT" && isMentorPath) {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/mentor/:path*",
    "/auth/login",
    "/auth/registration",
  ],
};

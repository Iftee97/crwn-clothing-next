import { NextResponse } from "next/server";

export async function middleware(request) {
  const tokenCookie = request.cookies.get("token")?.value;
  const isAdminCookie = request.cookies.get("isAdmin")?.value;

  const path = request.nextUrl.pathname;
  const publicPaths = ["/sign-in", "/sign-up"];
  const adminOnlyPaths = [
    "/all-users",
    "/all-orders",
    "/create-category",
    "/create-product",
  ];

  // if we have token cookie and path is public path, redirect to home
  if (tokenCookie && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if path is one of adminOnlyPaths and tokenCookie and isAdminCookie === 'true', allow access, otherwise redirect to home
  if (adminOnlyPaths.includes(path)) {
    if (tokenCookie && isAdminCookie === "true") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!tokenCookie && path === "/my-orders") {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/all-users",
    "/all-orders",
    "/my-orders",
    "/create-category",
    "/create-product",
  ], // pages that need auth
};

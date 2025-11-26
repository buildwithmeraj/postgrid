import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function proxy(request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/add-post/:path*",
    "/edit-post/:path*",
    "/my-posts/:path*",
  ],
};

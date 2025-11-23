import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function proxy(request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    // 1. Create the URL for the login page
    const loginUrl = new URL("/login", request.url);

    // 2. Append the current path (plus any search params) as a 'callbackUrl'
    // request.nextUrl.pathname = the path they tried to visit (e.g., /profile/settings)
    // request.nextUrl.search = any query params they had (e.g., ?sort=desc)
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    // 3. Redirect to the new login URL containing the callback
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: "/profile/:path*",
};

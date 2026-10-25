import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Replaces Next's built-in trailing-slash strip, disabled via
   `skipTrailingSlashRedirect` in next.config.ts so legacy WordPress
   redirects resolve in one hop. Proxy runs after redirects(), so anything
   reaching here is a non-legacy path: /projects/ -> /projects (308, query
   string kept), same as Next's default behaviour.

   Uses a plain URL, not request.nextUrl: NextURL remembers the incoming
   trailing slash and re-appends it when serialised, which made this
   redirect /projects/ to itself. */
export function proxy(request: NextRequest) {
    const url = new URL(request.url);
    if (url.pathname === "/" || !url.pathname.endsWith("/")) return NextResponse.next();
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
}

export const config = {
    // Matchers see the path with its trailing slash already normalised away,
    // so a "/.../" pattern never fires - match everything except Next
    // internals and filter in the function instead.
    matcher: ["/((?!_next/).*)"],
};

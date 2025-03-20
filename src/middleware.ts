import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Get token from cookies

    if (req.nextUrl.pathname.startsWith("/settings")) {
        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", req.url)); 
        }
    }

    return NextResponse.next(); 
}

// Apply middleware only to these routes
export const config = {
    matcher: ["/settings", "/settings/:path*"],
};

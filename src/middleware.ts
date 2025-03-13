import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromToken } from "../utils/auth";
export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Get token from cookies



    // If accessing settings page and not authenticated, redirect to login
    if (req.nextUrl.pathname.startsWith("/settings")) {
        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect to login page
        }
    }

    return NextResponse.next(); // Allow access if authenticated
}

// Apply middleware only to these routes
export const config = {
    matcher: ["/settings", "/settings/:path*"], // Ensure it works for /settings and subpages
};

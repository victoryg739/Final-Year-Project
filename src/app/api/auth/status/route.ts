import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../../../utils/auth";
export async function GET() {
    const user = await getUserFromToken();

    if (!user) {
        return NextResponse.json({ isLoggedIn: false });
    }

    return NextResponse.json({ isLoggedIn: true, user });
}

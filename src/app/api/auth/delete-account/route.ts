import { NextResponse } from "next/server";
import { prisma } from "../../../../../utils/prisma";
import { getUserFromToken } from "../../../../../utils/auth";
import { serialize } from "cookie";

export async function DELETE(req: Request) {
    try {
        const user = await getUserFromToken();

        if (!user || !user.username) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        await prisma.settings.delete({
            where: { username: user.username },
        });
        // Delete the user from the database
        const deletedUser = await prisma.user.delete({
            where: { username: user.username },
        });

        const cookie = serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0, // Expires immediately
        });

        const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
        response.headers.set("Set-Cookie", cookie);
        return response
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



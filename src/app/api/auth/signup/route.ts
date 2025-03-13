import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../../utils/prisma";

export async function POST(req: Request) {
    try {
        const { email, username, password } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await prisma.user.create({
            data: { email, username, password: hashedPassword },
        });

        // Create associated settings for the user
        const newSettings = await prisma.settings.create({
            data: {
                username: newUser.username,
                responseDelay: 2000,
                openAiApiKey: "",
            },
        });

        return NextResponse.json(
            { message: "User registered successfully", user: newUser, settings: newSettings },
            { status: 201 }
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

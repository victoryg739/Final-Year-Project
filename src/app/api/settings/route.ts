import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";

// Fetch settings by username (GET request)
export async function GET(req: Request) {
    try {
        // Extract username from the query parameters
        const url = new URL(req.url);
        const username = url.searchParams.get("username");

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const settings = await prisma.settings.findUnique({
            where: { username },
        });

        if (!settings) {
            return NextResponse.json({ responseDelay: 2000, openAiApiKey: "" });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

// Modify both responseDelay and openAiApiKey (PUT request)
export async function PUT(req: Request) {
    try {
        const { username, responseDelay, openAiApiKey } = await req.json();

        const settings = await prisma.settings.findUnique({
            where: { username },
        });

        if (!settings) {
            return NextResponse.json(
                { error: "Settings not found for this user" },
                { status: 404 }
            );
        }

        const updatedSettings = await prisma.settings.update({
            where: { username },
            data: { responseDelay, openAiApiKey },
        });

        return NextResponse.json(updatedSettings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}

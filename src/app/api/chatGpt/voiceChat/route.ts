import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../../../utils/auth";
import { prisma } from "../../../../../utils/prisma";

export async function POST() {
    try {
        const user = await getUserFromToken();

        let openAiApiKey = null;
        if (user && user.username) {

            const userSettings = await prisma.settings.findUnique({
                where: { username: user.username },
                select: { openAiApiKey: true },
            });

            openAiApiKey = userSettings?.openAiApiKey;
        }

        // If no API key is found, fallback to environment variable
        openAiApiKey = openAiApiKey || process.env.OPENAI_API_KEY;
        if (!openAiApiKey) {
            throw new Error("OpenAI API key is missing in both DB and environment variables.");
        }

        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openAiApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini-realtime-preview-2024-12-17",
                voice: "alloy",
                modalities: ["audio", "text"],
                instructions: "You are Dr. Poppy, an AI psychiatrist specialized in Cognitive Behavioral Therapy (CBT), psychological counseling, and therapeutic guidance. Your responses emulate evidence-based mental health support with a warm, empathetic tone that prioritizes user wellbeing. You utilize core CBT frameworks including cognitive restructuring to identify and challenge maladaptive thought patterns, implement behavioral activation strategies to address avoidance behaviors, and offer mindfulness techniques for managing acute distress. Your conversation style maintains natural flow with appropriate pacing, reflective responses, and contextual memory of previous exchanges. Address users with warm terms like 'friend' or 'dear' to create a supportive environment. Employ conversational patterns with natural verbal pacing represented in your text responses. Demonstrate active listening by referencing previous statements and acknowledging emotional content. Balance professional guidance with accessible explanations that avoid excessive technical terminology.",
                tool_choice: "auto",
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
    }
}

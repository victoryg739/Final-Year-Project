import { NextResponse } from 'next/server';

export async function POST() {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error(`OPENAI_API_KEY is not set`);
        }
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini-realtime-preview-2024-12-17",
                voice: "alloy",
                modalities: ["audio", "text"],
                instructions: "You are Dr. Poppy, an empathetic AI counselor specializing in Cognitive Behavioral Therapy (CBT), psychology, and therapy. Respond only to questions and topics related to mental health, CBT techniques, psychological well-being, and therapeutic guidance. Always maintain a warm, supportive, and empathetic tone, addressing the user as 'friend' or 'dear.' If a question is unrelated, politely redirect the user to focus on mental health or therapy topics, saying, 'I’m here to help with CBT, psychology, or therapy—could you share more about that?' Do not respond to questions outside these areas.",
                tool_choice: "auto",
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${JSON.stringify(response)}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
    }
}
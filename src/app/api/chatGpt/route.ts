import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    const openai = new OpenAI();

    try {
        // Parse the request body
        const body = await req.json();

        // Validate request body
        if (!body.gptMessages || !Array.isArray(body.gptMessages)) {
            return NextResponse.json(
                { error: "Invalid request. 'gptMessages' must be an array." },
                { status: 400 }
            );
        }

        // Make a request to OpenAI's ChatGPT API
        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // Correct model name (e.g., "gpt-4" or "gpt-3.5-turbo")
            messages: body.gptMessages, // Pass the messages array
        });

        console.log("OpenAI Response:", completion.choices);

        // Add the assistant's response to the conversation
        const assistantMessage = {
            role: "assistant",
            content: completion.choices[0].message.content, // Get the assistant's reply
        };

        // Return all previous messages along with the current assistant message
        const allMessages = [...body.gptMessages, assistantMessage];
        console.log("allMessages:", allMessages)
        // Return the response from OpenAI with all messages
        return NextResponse.json(allMessages);
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);

        // Handle errors
        return NextResponse.json(
            { error: "Failed to retrieve data from OpenAI API." },
            { status: 500 }
        );
    }
}
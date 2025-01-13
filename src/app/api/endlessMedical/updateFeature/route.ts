// app/api/updateFeature/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { sessionID, name, value } = body;

        // Validate required parameters
        if (!sessionID || !name || value === undefined) {
            return NextResponse.json(
                { error: 'SessionID, name, and value are required' },
                { status: 400 }
            );
        }

        // Call the Endless Medical API
        const url = `https://api.endlessmedical.com/v1/dx/UpdateFeature?SessionID=${encodeURIComponent(
            sessionID
        )}&name=${encodeURIComponent(name)}&value=${encodeURIComponent(value)}`;

        // Call the Endless Medical API with parameters in the URL
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        // Handle the response
        if (!response.ok) {
            // API returned an error
            return NextResponse.json(
                { error: data.error || 'Failed to update feature' },
                { status: response.status }
            );
        }

        // Return success response
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in UpdateFeature API route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
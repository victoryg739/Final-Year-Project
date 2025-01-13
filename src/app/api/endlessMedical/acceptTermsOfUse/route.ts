// app/api/acceptTerms/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log("hello");

    try {
        const body = await req.json();
        const { sessionID } = body;
        console.log("SessionID:", sessionID);

        // Check if sessionID is provided
        if (!sessionID) {
            return NextResponse.json(
                { error: 'SessionID is required' },
                { status: 400 }
            );
        }

        // Define the passphrase as per API requirements
        const passphrase =
            'I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com';

        // Build the URL with query parameters
        const url = `https://api.endlessmedical.com/v1/dx/AcceptTermsOfUse?SessionID=${encodeURIComponent(
            sessionID
        )}&passphrase=${encodeURIComponent(passphrase)}`;

        // Make the request without a body
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // No body is sent
        });

        console.log("Response Status:", response.status);

        const data = await response.json();

        if (!response.ok) {
            // Handle API errors
            return NextResponse.json(
                { error: data.error || 'Failed to accept terms of use' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in AcceptTermsOfUse API route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
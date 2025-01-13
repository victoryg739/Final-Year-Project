import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  res: NextResponse
) {
  const response = await fetch('https://api.endlessmedical.com/v1/dx/InitSession', {
    method: 'GET',
  });
  try {
    const data = await response.json();
    console.log(data)
    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json({ error: 'Failed to intialise response' }, { status: 500 });
  }
}
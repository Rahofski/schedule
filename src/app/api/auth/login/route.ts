import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';

export async function POST(request: NextRequest) {
  try {
    const credentials = await request.json();
    const loginUrl = `${BACKEND_URL}/auth/login`;

    // eslint-disable-next-line no-console
    console.log('[Login] Proxying request to backend:', loginUrl);

    const backendResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const responseBody = await backendResponse.text();

    const proxyResponse = new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        'Content-Type': backendResponse.headers.get('Content-Type') || 'application/json',
      },
    });

    const setCookieHeaders =
      typeof backendResponse.headers.getSetCookie === 'function'
        ? backendResponse.headers.getSetCookie()
        : backendResponse.headers.get('set-cookie')
          ? [backendResponse.headers.get('set-cookie') as string]
          : [];

    setCookieHeaders.forEach(cookieValue => {
      if (cookieValue) {
        proxyResponse.headers.append('Set-Cookie', cookieValue);
      }
    });

    if (!backendResponse.ok) {
      // eslint-disable-next-line no-console
      console.error('[Login] Backend returned error:', responseBody);
    }

    return proxyResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Login] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

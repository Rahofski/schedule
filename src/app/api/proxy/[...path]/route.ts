import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path, 'POST');
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path, 'PUT');
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path, 'PATCH');
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path, 'DELETE');
}

async function proxyRequest(request: NextRequest, path: string[], method: string) {
  try {
    const endpoint = `/${path.join('/')}`;
    const url = `${BACKEND_URL}${endpoint}`;

    // eslint-disable-next-line no-console
    console.log(`[Proxy] ${method} ${endpoint} -> ${url}`);

    // Получаем тело запроса если есть
    let body: string | undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      try {
        body = await request.text();
      } catch {
        body = undefined;
      }
    }

    // Копируем заголовки
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      // Пропускаем служебные заголовки Next.js
      if (!key.startsWith('x-') && key !== 'host' && key !== 'connection') {
        headers[key] = value;
      }
    });

    // Добавляем токен из cookies
    const accessToken = request.cookies.get('access-token')?.value;
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Делаем запрос на бэкенд
    const backendResponse = await fetch(url, {
      method,
      headers,
      body,
    });

    // eslint-disable-next-line no-console
    console.log(`[Proxy] ${method} ${endpoint} - Status: ${backendResponse.status}`);

    // Получаем тело ответа
    const responseText = await backendResponse.text();

    if (!backendResponse.ok) {
      // eslint-disable-next-line no-console
      console.error(`[Proxy] Error:`, responseText);
    }

    // Возвращаем ответ клиенту
    return new NextResponse(responseText, {
      status: backendResponse.status,
      headers: {
        'Content-Type': backendResponse.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Proxy error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

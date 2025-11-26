import { NextRequest, NextResponse } from 'next/server';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === 'mock@gmail.com' && password === 'mock123') {
      // Создаем валидные JWT токены для мока
      const currentTime = Math.floor(Date.now() / 1000);
      const accessTokenExpiry = currentTime + 10 * 60; // 10 минут
      const refreshTokenExpiry = currentTime + 7 * 24 * 60 * 60; // 7 дней

      // Создаем payload для access токена
      const accessPayload = {
        sub: '1',
        email: 'mock@gmail.com',
        name: 'Mock User',
        iat: currentTime,
        exp: accessTokenExpiry,
      };

      // Создаем payload для refresh токена
      const refreshPayload = {
        sub: '1',
        type: 'refresh',
        iat: currentTime,
        exp: refreshTokenExpiry,
      };

      // Кодируем в Base64 (простой мок JWT без подписи)
      const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Buffer.from(JSON.stringify(accessPayload)).toString('base64')}.mock_signature`;
      const refreshToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Buffer.from(JSON.stringify(refreshPayload)).toString('base64')}.mock_signature`;

      const response = NextResponse.json(
        {
          success: true,
          user: { id: 1, email: 'mock@gmail.com', name: 'Mock User' },
        },
        { status: 200 }
      );

      // Устанавливаем access токен (короткий срок жизни, httpOnly)
      response.cookies.set('access-token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 10 * 60, // 10 минут
        path: '/',
      });

      // Устанавливаем refresh токен (длинный срок жизни, httpOnly)
      response.cookies.set('refresh-token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 дней
        path: '/',
      });
      return response;
    }

    // Отправляем запрос на бэкенд
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    const loginUrl = `${backendUrl}/auth/login`;

    // eslint-disable-next-line no-console
    console.log('[Login] Sending request to backend:', loginUrl);

    const backendResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // eslint-disable-next-line no-console
    console.log('[Login] Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      // Проксируем ошибку от бэкенда
      const errorText = await backendResponse.text();
      // eslint-disable-next-line no-console
      console.error('[Login] Backend error:', errorText);

      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(errorData, { status: backendResponse.status });
      } catch {
        return NextResponse.json({ error: errorText || 'Authentication failed' }, { status: backendResponse.status });
      }
    }

    // Получаем токены от бэкенда
    const data: AuthResponse = await backendResponse.json();

    const response = NextResponse.json(
      {
        success: true,
        user: data.user,
      },
      { status: 200 }
    );

    // Устанавливаем access токен (короткий срок жизни, httpOnly)
    response.cookies.set('access-token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60, // 10 минут
      path: '/',
    });

    // Устанавливаем refresh токен (длинный срок жизни, httpOnly)
    response.cookies.set('refresh-token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 дней
      path: '/',
    });

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Login] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

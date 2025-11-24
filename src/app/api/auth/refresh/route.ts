import { NextRequest, NextResponse } from 'next/server';

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string; // Опционально может обновляться и refresh токен
}

export async function POST(request: NextRequest) {
  try {
    // Получаем refresh токен из cookies
    const refreshToken = request.cookies.get('refresh-token')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Проверяем, если это мок токен
    if (refreshToken.includes('mock_signature')) {
      // Моковая логика для разработки
      const currentTime = Math.floor(Date.now() / 1000);
      const accessTokenExpiry = currentTime + 10 * 60; // 10 минут

      const accessPayload = {
        sub: '1',
        email: 'mock@gmail.com',
        name: 'Mock User',
        iat: currentTime,
        exp: accessTokenExpiry,
      };

      const newAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Buffer.from(JSON.stringify(accessPayload)).toString('base64')}.mock_signature`;

      const response = NextResponse.json({ success: true });

      response.cookies.set('access-token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 10 * 60, // 10 минут
        path: '/',
      });

      return response;
    }

    // Отправляем refresh токен на бэкенд для получения нового access токена
    const backendResponse = await fetch('http://api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!backendResponse.ok) {
      // Если refresh токен невалиден, очищаем cookies
      const response = NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });

      response.cookies.set('access-token', '', { maxAge: 0, path: '/' });
      response.cookies.set('refresh-token', '', { maxAge: 0, path: '/' });

      return response;
    }

    // Получаем новые токены от бэкенда
    const data: RefreshResponse = await backendResponse.json();

    const response = NextResponse.json({ success: true });

    // Устанавливаем новый access токен
    response.cookies.set('access-token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60, // 10 минут
      path: '/',
    });

    // Если бэкенд прислал новый refresh токен, обновляем и его
    if (data.refreshToken) {
      response.cookies.set('refresh-token', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 дней
        path: '/',
      });
    }

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

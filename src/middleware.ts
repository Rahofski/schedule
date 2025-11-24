import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Функция для декодирования JWT токена без проверки подписи
function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString()
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Проверка истечения токена
function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const bufferTime = 2 * 60 * 1000; // 2 минуты буфер

  return currentTime >= expirationTime - bufferTime;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Разрешаем доступ к login странице и API routes
  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Проверяем доступ к защищенным страницам
  if (pathname.startsWith('/panel')) {
    const accessToken = request.cookies.get('access-token')?.value;
    const refreshToken = request.cookies.get('refresh-token')?.value;

    // Если нет refresh токена, редиректим на логин
    if (!refreshToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Если нет access токена или он истек, пытаемся обновить
    if (!accessToken || isTokenExpired(accessToken)) {
      try {
        // Пытаемся обновить токен через наш API
        const refreshResponse = await fetch(new URL('/api/auth/refresh', request.url), {
          method: 'POST',
          headers: {
            Cookie: request.headers.get('cookie') || '',
          },
        });

        if (refreshResponse.ok) {
          // Получаем новые cookies из ответа
          const setCookieHeader = refreshResponse.headers.get('set-cookie');

          const response = NextResponse.next();

          // Прокидываем новые cookies в ответ
          if (setCookieHeader) {
            response.headers.set('set-cookie', setCookieHeader);
          }

          return response;
        } else {
          // Если не удалось обновить токен, редиректим на логин
          const loginUrl = new URL('/login', request.url);
          return NextResponse.redirect(loginUrl);
        }
      } catch {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

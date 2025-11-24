import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Создаем ответ об успешном logout
    const response = NextResponse.json({ success: true });

    // Удаляем access токен
    response.cookies.set('access-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Удаляем cookie
      path: '/',
    });

    // Удаляем refresh токен
    response.cookies.set('refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Удаляем cookie
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}

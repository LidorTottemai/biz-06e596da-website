import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    return NextResponse.json({ error: 'No password set' }, { status: 400 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!body.password || body.password !== sitePassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const maxAge = 60 * 60 * 24 * 30; // 30 days in seconds

  const response = NextResponse.json({ ok: true });
  response.cookies.set('site-auth', sitePassword, {
    httpOnly: false,
    maxAge,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

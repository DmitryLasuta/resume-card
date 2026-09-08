import { NextResponse, type NextRequest } from 'next/server';

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAuthConfigured,
  isPasswordValid,
} from '@/lib/auth';

/** Простейший тротлинг попыток входа в пределах одного инстанса. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function isThrottled(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: 'Не задана переменная окружения ADMIN_PASSWORD' },
      { status: 500 },
    );
  }

  const ip = request.headers.get('x-forwarded-for') ?? 'local';
  if (isThrottled(ip)) {
    return NextResponse.json(
      { error: 'Слишком много попыток. Попробуйте через 10 минут.' },
      { status: 429 },
    );
  }

  let password: unknown;
  try {
    password = (await request.json())?.password;
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
  }

  if (!isPasswordValid(password)) {
    return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
  }

  attempts.delete(ip);

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: await createSessionToken(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

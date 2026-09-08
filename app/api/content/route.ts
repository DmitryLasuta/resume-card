import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_COOKIE, isSessionValid } from '@/lib/auth';
import { CONTENT_TAG } from '@/lib/content';
import { normalizeContent } from '@/lib/normalize';
import { readContent, writeContent } from '@/lib/storage';

export const dynamic = 'force-dynamic';

/** Публичное чтение — удобно для проверки и как «API резюме». */
export async function GET() {
  return NextResponse.json(await readContent());
}

/** Сохранение из админки. */
export async function PUT(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!(await isSessionValid(token))) {
    return NextResponse.json({ error: 'Требуется вход' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const content = normalizeContent(payload);

  try {
    await writeContent(content);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка записи';
    return NextResponse.json({ error: `Не удалось сохранить: ${message}` }, { status: 500 });
  }

  revalidateTag(CONTENT_TAG, { expire: 0 });
  revalidatePath('/');

  return NextResponse.json({ ok: true, content });
}

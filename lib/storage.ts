import 'server-only';

import { head, put } from '@vercel/blob';

import type { IContent } from './content-types';
import { defaultContent } from './default-content';
import { normalizeContent } from './normalize';

/**
 * Хранилище контента без БД.
 *
 * Прод (Vercel): один JSON-файл в Vercel Blob. Нужна переменная окружения
 * BLOB_READ_WRITE_TOKEN — Vercel подставляет её сам, когда к проекту
 * подключён Blob-стор.
 *
 * Локально: если токена нет, тот же JSON лежит в .data/content.json.
 */

const BLOB_PATHNAME = 'resume/content.json';
const LOCAL_PATH = '.data/content.json';

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocal(): Promise<IContent | null> {
  const { readFile } = await import('node:fs/promises');
  const { resolve } = await import('node:path');
  try {
    const raw = await readFile(resolve(process.cwd(), LOCAL_PATH), 'utf8');
    return normalizeContent(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeLocal(content: IContent): Promise<void> {
  const { mkdir, writeFile } = await import('node:fs/promises');
  const { dirname, resolve } = await import('node:path');
  const target = resolve(process.cwd(), LOCAL_PATH);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
}

async function readBlob(): Promise<IContent | null> {
  let url: string;
  let version: string;
  try {
    const meta = await head(BLOB_PATHNAME);
    url = meta.url;
    version = String(meta.uploadedAt.getTime());
  } catch {
    // блоба ещё нет — первый запуск
    return null;
  }

  // URL блоба кэшируется на CDN, поэтому добавляем метку версии из head()
  const response = await fetch(`${url}?v=${version}`, { cache: 'no-store' });
  if (!response.ok) return null;
  return normalizeContent(await response.json());
}

async function writeBlob(content: IContent): Promise<void> {
  await put(BLOB_PATHNAME, `${JSON.stringify(content, null, 2)}\n`, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

/** Текущий контент; при пустом хранилище — значения по умолчанию. */
export async function readContent(): Promise<IContent> {
  const stored = hasBlob() ? await readBlob() : await readLocal();
  return stored ?? defaultContent;
}

export async function writeContent(content: IContent): Promise<void> {
  if (hasBlob()) {
    await writeBlob(content);
    return;
  }

  if (process.env.VERCEL) {
    // на Vercel файловая система только для чтения — нужен Blob-стор
    throw new Error(
      'не подключён Vercel Blob: создайте Blob-стор в дашборде проекта, ' +
        'чтобы появилась переменная BLOB_READ_WRITE_TOKEN',
    );
  }

  await writeLocal(content);
}

/** Где сейчас лежат данные — показываем в админке. */
export function storageMode(): 'blob' | 'local' {
  return hasBlob() ? 'blob' : 'local';
}

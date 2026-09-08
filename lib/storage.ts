import 'server-only';

import { BlobNotFoundError, get, put, type BlobAccessType } from '@vercel/blob';

import type { IContent } from './content-types';
import { defaultContent } from './default-content';
import { normalizeContent } from './normalize';

/**
 * Хранилище контента без БД.
 *
 * Прод (Vercel): один JSON-файл в Vercel Blob. Переменные подставляет сам
 * Vercel, когда к проекту подключён Blob-стор — в зависимости от версии
 * интеграции это либо BLOB_READ_WRITE_TOKEN (старая), либо BLOB_STORE_ID
 * вместе с VERCEL_OIDC_TOKEN, который выдаётся функциям в рантайме (новая).
 *
 * Локально: если ни того, ни другого нет, тот же JSON лежит в
 * .data/content.json.
 */

const BLOB_PATHNAME = 'resume/content.json';
const LOCAL_PATH = '.data/content.json';

/**
 * Режим доступа стора. Vercel создаёт новые сторы приватными, и обращаться
 * к ним нужно тем же режимом, иначе API отвечает ошибкой. Для публичного
 * стора достаточно задать BLOB_ACCESS=public.
 */
const BLOB_ACCESS: BlobAccessType = process.env.BLOB_ACCESS === 'public' ? 'public' : 'private';

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
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
  try {
    // useCache: false — читаем из origin, чтобы правки из админки были видны сразу
    const result = await get(BLOB_PATHNAME, { access: BLOB_ACCESS, useCache: false });
    if (!result || result.statusCode !== 200) return null;
    return normalizeContent(await new Response(result.stream).json());
  } catch (error) {
    // блоба ещё нет — первый запуск, отдаём значения по умолчанию
    if (error instanceof BlobNotFoundError) return null;
    console.error('Не удалось прочитать контент из Vercel Blob:', error);
    return null;
  }
}

async function writeBlob(content: IContent): Promise<void> {
  await put(BLOB_PATHNAME, `${JSON.stringify(content, null, 2)}\n`, {
    access: BLOB_ACCESS,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
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
      'не подключён Vercel Blob: создайте Blob-стор в дашборде проекта и ' +
        'подключите его к нему — Vercel сам добавит BLOB_STORE_ID ' +
        '(или BLOB_READ_WRITE_TOKEN в старой версии интеграции)',
    );
  }

  await writeLocal(content);
}

/** Где сейчас лежат данные — показываем в админке. */
export function storageMode(): 'blob' | 'local' {
  return hasBlob() ? 'blob' : 'local';
}

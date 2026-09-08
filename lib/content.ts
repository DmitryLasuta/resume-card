import 'server-only';

import { unstable_cache } from 'next/cache';

import type { IContent } from './content-types';
import { readContent } from './storage';

export const CONTENT_TAG = 'resume-content';

/**
 * Кэшированное чтение для публичной страницы: одно обращение к хранилищу
 * раз в 5 минут либо сразу после сохранения из админки (сброс по тегу).
 */
export const getPublicContent: () => Promise<IContent> = unstable_cache(
  async () => readContent(),
  ['resume-content'],
  { tags: [CONTENT_TAG], revalidate: 300 },
);

/**
 * Аутентификация админки: один пароль из ADMIN_PASSWORD и подписанная HMAC-кука.
 * Реализация на Web Crypto, чтобы работать и в Node-, и в Edge-рантайме
 * (middleware). Никаких зависимостей и БД сессий.
 */

export const SESSION_COOKIE = 'rc_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 дней

const encoder = new TextEncoder();

function secret(): string {
  const value = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) {
    throw new Error('Не задана переменная окружения ADMIN_PASSWORD');
  }
  return value;
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return toBase64Url(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function isPasswordValid(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== 'string') return false;
  return timingSafeEqual(input, expected);
}

/** Токен вида `<expiresAt>.<hmac>`. */
export async function createSessionToken(): Promise<string> {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${await sign(expiresAt)}`;
}

export async function isSessionValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const separator = token.lastIndexOf('.');
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  try {
    return timingSafeEqual(signature, await sign(payload));
  } catch {
    return false;
  }
}

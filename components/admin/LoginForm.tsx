'use client';

import { useState, type FormEvent } from 'react';

import { Button, Field, TextInput } from './ui';

export function LoginForm({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(payload?.error ?? 'Не удалось войти');
        return;
      }

      const from = new URLSearchParams(window.location.search).get('from');
      window.location.href = from && from.startsWith('/admin') ? from : '/admin';
    } catch {
      setError('Сеть недоступна');
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-line bg-ink-raised p-6"
      >
        <h1 className="font-display text-2xl text-parchment">Вход в админку</h1>
        <p className="mt-2 mb-6 text-sm text-parchment-dim">
          {configured
            ? 'Введите пароль администратора.'
            : 'Не задана переменная окружения ADMIN_PASSWORD — вход невозможен.'}
        </p>

        <Field label="Пароль">
          <TextInput type="password" value={password} onChange={setPassword} />
        </Field>

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <div className="mt-6">
          <Button type="submit" tone="primary" disabled={isPending || !configured}>
            {isPending ? 'Проверяем…' : 'Войти'}
          </Button>
        </div>
      </form>
    </main>
  );
}

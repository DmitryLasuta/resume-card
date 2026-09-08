'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import type { IContent } from '@/lib/content-types';

import { AboutEditor } from './sections/AboutEditor';
import { ContactEditor } from './sections/ContactEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { HeroEditor } from './sections/HeroEditor';
import { JsonEditor } from './sections/JsonEditor';
import { MetaEditor } from './sections/MetaEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { Button } from './ui';

const TABS = [
  { id: 'hero', label: 'Шапка' },
  { id: 'about', label: 'О себе' },
  { id: 'experience', label: 'Опыт' },
  { id: 'skills', label: 'Навыки' },
  { id: 'contact', label: 'Контакты' },
  { id: 'meta', label: 'SEO' },
  { id: 'json', label: 'JSON' },
] as const;

type TTabId = (typeof TABS)[number]['id'];
type TStatus = { kind: 'idle' | 'saving' | 'saved' | 'error'; message?: string };

export function AdminEditor({
  initial,
  storage,
}: {
  initial: IContent;
  storage: 'blob' | 'local';
}) {
  const [content, setContent] = useState<IContent>(initial);
  const [saved, setSaved] = useState<IContent>(initial);
  const [tab, setTab] = useState<TTabId>('hero');
  const [status, setStatus] = useState<TStatus>({ kind: 'idle' });

  const isDirty = useMemo(
    () => JSON.stringify(content) !== JSON.stringify(saved),
    [content, saved],
  );

  const save = useCallback(async () => {
    setStatus({ kind: 'saving' });
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(content),
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus({ kind: 'error', message: payload?.error ?? 'Не удалось сохранить' });
        return;
      }

      setContent(payload.content);
      setSaved(payload.content);
      setStatus({ kind: 'saved', message: 'Сохранено' });
    } catch {
      setStatus({ kind: 'error', message: 'Сеть недоступна' });
    }
  }, [content]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        void save();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [save]);

  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (status.kind !== 'saved') return;
    const timer = setTimeout(() => setStatus({ kind: 'idle' }), 2500);
    return () => clearTimeout(timer);
  }, [status.kind]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const patch = <K extends keyof IContent>(key: K) => (value: IContent[K]) =>
    setContent((current) => ({ ...current, [key]: value }));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-3">
          <span className="font-display text-lg text-parchment">Админка резюме</span>

          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${
              storage === 'blob'
                ? 'bg-brass-soft text-brass'
                : 'border border-line text-parchment-dim'
            }`}
            title={
              storage === 'blob'
                ? 'Данные в Vercel Blob'
                : 'Локальный режим: данные в .data/content.json'
            }
          >
            {storage === 'blob' ? 'blob' : 'локально'}
          </span>

          <div className="ml-auto flex items-center gap-3">
            {status.kind === 'error' ? (
              <span className="text-sm text-red-400">{status.message}</span>
            ) : null}
            {status.kind === 'saved' ? (
              <span className="text-sm text-brass">Сохранено</span>
            ) : null}
            {isDirty && status.kind !== 'saving' ? (
              <span className="text-sm text-parchment-dim">Есть несохранённые правки</span>
            ) : null}

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-parchment transition-colors hover:border-brass hover:text-brass"
            >
              Открыть сайт
            </a>
            <Button onClick={logout}>Выйти</Button>
            <Button
              tone="primary"
              onClick={() => void save()}
              disabled={status.kind === 'saving' || !isDirty}
            >
              {status.kind === 'saving' ? 'Сохранение…' : 'Сохранить'}
            </Button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 pb-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                tab === item.id
                  ? 'bg-brass-soft text-brass'
                  : 'text-parchment-dim hover:text-parchment'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        {tab === 'hero' ? <HeroEditor hero={content.hero} onChange={patch('hero')} /> : null}
        {tab === 'about' ? <AboutEditor about={content.about} onChange={patch('about')} /> : null}
        {tab === 'experience' ? (
          <ExperienceEditor experience={content.experience} onChange={patch('experience')} />
        ) : null}
        {tab === 'skills' ? (
          <SkillsEditor skills={content.skills} onChange={patch('skills')} />
        ) : null}
        {tab === 'contact' ? (
          <ContactEditor contact={content.contact} onChange={patch('contact')} />
        ) : null}
        {tab === 'meta' ? <MetaEditor meta={content.meta} onChange={patch('meta')} /> : null}
        {tab === 'json' ? <JsonEditor content={content} onChange={setContent} /> : null}

        <p className="mt-8 text-xs text-parchment-dim">
          Ctrl/⌘ + S — сохранить. После сохранения публичная страница обновляется сразу.
        </p>
      </main>
    </div>
  );
}

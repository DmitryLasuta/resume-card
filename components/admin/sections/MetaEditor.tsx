'use client';

import type { ISiteMeta } from '@/lib/content-types';

import { Card, Field, TextArea, TextInput } from '../ui';

export function MetaEditor({
  meta,
  onChange,
}: {
  meta: ISiteMeta;
  onChange: (next: ISiteMeta) => void;
}) {
  const set = <K extends keyof ISiteMeta>(key: K, value: ISiteMeta[K]) =>
    onChange({ ...meta, [key]: value });

  return (
    <div className="space-y-5">
      <Card title="SEO страницы">
        <Field label="Title" hint="заголовок вкладки и выдачи">
          <TextInput value={meta.title} onChange={(v) => set('title', v)} />
        </Field>
        <Field label="Description">
          <TextArea value={meta.description} onChange={(v) => set('description', v)} rows={3} />
        </Field>
        <Field label="Адрес сайта" hint="нужен для абсолютных ссылок в OG">
          <TextInput
            value={meta.url}
            onChange={(v) => set('url', v)}
            placeholder="https://example.vercel.app"
          />
        </Field>
      </Card>

      <Card title="Превью в мессенджерах (Open Graph)">
        <Field label="Название сайта">
          <TextInput value={meta.siteName} onChange={(v) => set('siteName', v)} />
        </Field>
        <Field label="OG-заголовок">
          <TextInput value={meta.ogTitle} onChange={(v) => set('ogTitle', v)} />
        </Field>
        <Field label="OG-описание">
          <TextArea value={meta.ogDescription} onChange={(v) => set('ogDescription', v)} rows={3} />
        </Field>
        <Field label="OG-картинка" hint="путь из /public или полный URL">
          <TextInput value={meta.ogImage} onChange={(v) => set('ogImage', v)} />
        </Field>
        <Field label="Локаль">
          <TextInput value={meta.locale} onChange={(v) => set('locale', v)} placeholder="ru_RU" />
        </Field>
      </Card>
    </div>
  );
}

'use client';

import type { IContactLink, IContactSection } from '@/lib/content-types';
import { moveItem, newId, removeAt, replaceAt } from '@/lib/list-utils';

import { Button, Card, Field, RowControls, TextInput, Toggle } from '../ui';

export function ContactEditor({
  contact,
  onChange,
}: {
  contact: IContactSection;
  onChange: (next: IContactSection) => void;
}) {
  const set = <K extends keyof IContactSection>(key: K, value: IContactSection[K]) =>
    onChange({ ...contact, [key]: value });

  const setLinks = (links: IContactLink[]) => set('links', links);

  return (
    <Card
      title="Контакты"
      actions={
        <>
          <Toggle
            checked={contact.enabled}
            onChange={(v) => set('enabled', v)}
            label="Показывать"
          />
          <Button
            onClick={() =>
              setLinks([...contact.links, { id: newId('ct'), label: '', value: '', href: '' }])
            }
          >
            + Контакт
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Заголовок секции">
          <TextInput value={contact.heading} onChange={(v) => set('heading', v)} />
        </Field>
        <Field label="Подпись в футере" hint="© 2026 …">
          <TextInput value={contact.footerName} onChange={(v) => set('footerName', v)} />
        </Field>
      </div>

      {contact.links.map((link, index) => (
        <div key={link.id} className="rounded-xl border border-line p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="font-mono text-xs uppercase tracking-wide text-parchment-dim">
              {link.label || `Контакт ${index + 1}`}
            </span>
            <RowControls
              canUp={index > 0}
              canDown={index < contact.links.length - 1}
              onUp={() => setLinks(moveItem(contact.links, index, index - 1))}
              onDown={() => setLinks(moveItem(contact.links, index, index + 1))}
              onRemove={() => setLinks(removeAt(contact.links, index))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Подпись">
              <TextInput
                value={link.label}
                placeholder="Telegram"
                onChange={(v) => setLinks(replaceAt(contact.links, index, { ...link, label: v }))}
              />
            </Field>
            <Field label="Значение">
              <TextInput
                value={link.value}
                placeholder="@nickname"
                onChange={(v) => setLinks(replaceAt(contact.links, index, { ...link, value: v }))}
              />
            </Field>
            <Field label="Ссылка">
              <TextInput
                value={link.href}
                placeholder="https://t.me/nickname"
                onChange={(v) => setLinks(replaceAt(contact.links, index, { ...link, href: v }))}
              />
            </Field>
          </div>
        </div>
      ))}
    </Card>
  );
}

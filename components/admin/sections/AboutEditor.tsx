'use client';

import type { IAboutSection, IParagraph } from '@/lib/content-types';
import { moveItem, newId, removeAt, replaceAt } from '@/lib/list-utils';

import { Button, Card, Field, RowControls, TextArea, TextInput, Toggle } from '../ui';

export function AboutEditor({
  about,
  onChange,
}: {
  about: IAboutSection;
  onChange: (next: IAboutSection) => void;
}) {
  const set = <K extends keyof IAboutSection>(key: K, value: IAboutSection[K]) =>
    onChange({ ...about, [key]: value });

  const setParagraphs = (paragraphs: IParagraph[]) => set('paragraphs', paragraphs);

  return (
    <Card
      title="О себе"
      actions={
        <>
          <Toggle
            checked={about.enabled}
            onChange={(v) => set('enabled', v)}
            label="Показывать"
          />
          <Button
            onClick={() => setParagraphs([...about.paragraphs, { id: newId('p'), text: '' }])}
          >
            + Абзац
          </Button>
        </>
      }
    >
      <Field label="Заголовок секции">
        <TextInput value={about.heading} onChange={(v) => set('heading', v)} />
      </Field>

      {about.paragraphs.map((paragraph, index) => (
        <div key={paragraph.id} className="flex items-start gap-3">
          <div className="flex-1">
            <TextArea
              value={paragraph.text}
              rows={4}
              placeholder="Текст абзаца"
              onChange={(v) =>
                setParagraphs(replaceAt(about.paragraphs, index, { ...paragraph, text: v }))
              }
            />
          </div>
          <RowControls
            canUp={index > 0}
            canDown={index < about.paragraphs.length - 1}
            onUp={() => setParagraphs(moveItem(about.paragraphs, index, index - 1))}
            onDown={() => setParagraphs(moveItem(about.paragraphs, index, index + 1))}
            onRemove={() => setParagraphs(removeAt(about.paragraphs, index))}
          />
        </div>
      ))}

      <Field label="Приписка" hint="город, готовность к переезду и т.п.">
        <TextArea value={about.note} onChange={(v) => set('note', v)} rows={2} />
      </Field>
    </Card>
  );
}

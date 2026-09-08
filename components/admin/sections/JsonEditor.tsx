'use client';

import { useState } from 'react';

import type { IContent } from '@/lib/content-types';
import { defaultContent } from '@/lib/default-content';
import { normalizeContent } from '@/lib/normalize';

import { Button, Card, TextArea } from '../ui';

export function JsonEditor({
  content,
  onChange,
}: {
  content: IContent;
  onChange: (next: IContent) => void;
}) {
  const [draft, setDraft] = useState(() => JSON.stringify(content, null, 2));
  const [error, setError] = useState<string | null>(null);

  const apply = () => {
    try {
      onChange(normalizeContent(JSON.parse(draft)));
      setError(null);
    } catch {
      setError('Не удалось разобрать JSON — проверьте синтаксис.');
    }
  };

  const reloadFromState = () => {
    setDraft(JSON.stringify(content, null, 2));
    setError(null);
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-content.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      title="JSON целиком"
      actions={
        <>
          <Button onClick={reloadFromState}>Подтянуть из формы</Button>
          <Button onClick={download}>Скачать</Button>
          <Button onClick={() => setDraft(JSON.stringify(defaultContent, null, 2))}>
            Значения по умолчанию
          </Button>
          <Button tone="primary" onClick={apply}>
            Применить в форму
          </Button>
        </>
      }
    >
      <p className="text-sm text-parchment-dim">
        Резервная копия и массовые правки. «Применить в форму» только переносит JSON в
        редактор — на сайт изменения попадут после «Сохранить».
      </p>
      <TextArea value={draft} onChange={setDraft} rows={24} mono />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </Card>
  );
}

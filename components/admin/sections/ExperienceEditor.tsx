'use client';

import type {
  IExperienceHighlight,
  IExperienceItem,
  IExperienceSection,
} from '@/lib/content-types';
import { moveItem, newId, removeAt, replaceAt } from '@/lib/list-utils';

import { Button, Card, Field, RowControls, TextArea, TextInput, Toggle } from '../ui';

function emptyJob(): IExperienceItem {
  return {
    id: newId('exp'),
    company: '',
    role: '',
    period: '',
    duration: '',
    location: '',
    summary: '',
    highlights: [],
  };
}

function JobEditor({
  job,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  job: IExperienceItem;
  index: number;
  total: number;
  onChange: (next: IExperienceItem) => void;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  const set = <K extends keyof IExperienceItem>(key: K, value: IExperienceItem[K]) =>
    onChange({ ...job, [key]: value });

  const setHighlights = (highlights: IExperienceHighlight[]) => set('highlights', highlights);

  return (
    <div className="rounded-xl border border-line p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="font-display text-base text-parchment">
          {job.role || 'Новое место работы'}
          {job.company ? (
            <span className="text-parchment-dim"> · {job.company}</span>
          ) : null}
        </span>
        <RowControls
          canUp={index > 0}
          canDown={index < total - 1}
          onUp={() => onMove(index - 1)}
          onDown={() => onMove(index + 1)}
          onRemove={onRemove}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Должность">
          <TextInput value={job.role} onChange={(v) => set('role', v)} />
        </Field>
        <Field label="Компания">
          <TextInput value={job.company} onChange={(v) => set('company', v)} />
        </Field>
        <Field label="Период">
          <TextInput
            value={job.period}
            onChange={(v) => set('period', v)}
            placeholder="Июль 2025 — Август 2026"
          />
        </Field>
        <Field label="Длительность">
          <TextInput
            value={job.duration}
            onChange={(v) => set('duration', v)}
            placeholder="1 год 2 месяца"
          />
        </Field>
      </div>

      <div className="mt-4 space-y-4">
        <Field label="Локация / формат">
          <TextInput
            value={job.location}
            onChange={(v) => set('location', v)}
            placeholder="Новороссийск · аутсорс-разработка"
          />
        </Field>
        <Field label="Краткое описание" hint="один абзац о задачах">
          <TextArea value={job.summary} onChange={(v) => set('summary', v)} rows={4} />
        </Field>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-parchment-dim">
            Ключевые пункты
          </span>
          <Button
            onClick={() =>
              setHighlights([...job.highlights, { id: newId('hl'), label: '', detail: '' }])
            }
          >
            + Пункт
          </Button>
        </div>

        <div className="space-y-3">
          {job.highlights.map((highlight, hIndex) => (
            <div key={highlight.id} className="flex items-start gap-3">
              <div className="flex-1 space-y-2">
                <TextInput
                  value={highlight.label}
                  placeholder="Заголовок пункта"
                  onChange={(v) =>
                    setHighlights(
                      replaceAt(job.highlights, hIndex, { ...highlight, label: v }),
                    )
                  }
                />
                <TextArea
                  value={highlight.detail}
                  rows={3}
                  placeholder="Что именно делали"
                  onChange={(v) =>
                    setHighlights(
                      replaceAt(job.highlights, hIndex, { ...highlight, detail: v }),
                    )
                  }
                />
              </div>
              <RowControls
                canUp={hIndex > 0}
                canDown={hIndex < job.highlights.length - 1}
                onUp={() => setHighlights(moveItem(job.highlights, hIndex, hIndex - 1))}
                onDown={() => setHighlights(moveItem(job.highlights, hIndex, hIndex + 1))}
                onRemove={() => setHighlights(removeAt(job.highlights, hIndex))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceEditor({
  experience,
  onChange,
}: {
  experience: IExperienceSection;
  onChange: (next: IExperienceSection) => void;
}) {
  const set = <K extends keyof IExperienceSection>(key: K, value: IExperienceSection[K]) =>
    onChange({ ...experience, [key]: value });

  const setItems = (items: IExperienceItem[]) => set('items', items);

  return (
    <Card
      title="Опыт работы"
      actions={
        <>
          <Toggle
            checked={experience.enabled}
            onChange={(v) => set('enabled', v)}
            label="Показывать"
          />
          <Button tone="primary" onClick={() => setItems([...experience.items, emptyJob()])}>
            + Место работы
          </Button>
        </>
      }
    >
      <Field label="Заголовок секции">
        <TextInput value={experience.heading} onChange={(v) => set('heading', v)} />
      </Field>

      {experience.items.length === 0 ? (
        <p className="text-sm text-parchment-dim">
          Пока пусто — добавьте первое место работы.
        </p>
      ) : null}

      {experience.items.map((job, index) => (
        <JobEditor
          key={job.id}
          job={job}
          index={index}
          total={experience.items.length}
          onChange={(next) => setItems(replaceAt(experience.items, index, next))}
          onMove={(to) => setItems(moveItem(experience.items, index, to))}
          onRemove={() => setItems(removeAt(experience.items, index))}
        />
      ))}
    </Card>
  );
}

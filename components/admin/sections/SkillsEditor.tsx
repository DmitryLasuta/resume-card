'use client';

import { useState } from 'react';

import type { ISkillGroup, ISkillsSection } from '@/lib/content-types';
import { moveItem, newId, removeAt, replaceAt } from '@/lib/list-utils';

import { Button, Card, Field, RowControls, TextInput, Toggle } from '../ui';

/** Ввод навыка: Enter добавляет чип. */
function SkillInput({ onAdd }: { onAdd: (value: string) => void }) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft('');
  };

  return (
    <div className="flex gap-2">
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
          }
        }}
        placeholder="Новый навык и Enter"
        className="w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/60 focus:border-brass focus:outline-none"
      />
      <Button onClick={commit}>Добавить</Button>
    </div>
  );
}

function GroupEditor({
  group,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  group: ISkillGroup;
  index: number;
  total: number;
  onChange: (next: ISkillGroup) => void;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  const setItems = (items: string[]) => onChange({ ...group, items });

  return (
    <div className="rounded-xl border border-line p-4">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="flex-1">
          <Field label="Название группы">
            <TextInput
              value={group.title}
              onChange={(v) => onChange({ ...group, title: v })}
              placeholder="Инструменты"
            />
          </Field>
        </div>
        <RowControls
          canUp={index > 0}
          canDown={index < total - 1}
          onUp={() => onMove(index - 1)}
          onDown={() => onMove(index + 1)}
          onRemove={onRemove}
        />
      </div>

      {group.items.length > 0 ? (
        <ul className="mb-3 flex flex-wrap gap-2">
          {group.items.map((item, itemIndex) => (
            <li
              key={`${item}-${itemIndex}`}
              className="group flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-parchment"
            >
              <input
                value={item}
                onChange={(event) =>
                  setItems(replaceAt(group.items, itemIndex, event.target.value))
                }
                size={Math.max(item.length, 4)}
                className="bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setItems(removeAt(group.items, itemIndex))}
                aria-label={`Удалить «${item}»`}
                className="text-parchment-dim transition-colors hover:text-red-400"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-3 text-sm text-parchment-dim">В группе пока нет навыков.</p>
      )}

      <SkillInput onAdd={(value) => setItems([...group.items, value])} />
    </div>
  );
}

export function SkillsEditor({
  skills,
  onChange,
}: {
  skills: ISkillsSection;
  onChange: (next: ISkillsSection) => void;
}) {
  const set = <K extends keyof ISkillsSection>(key: K, value: ISkillsSection[K]) =>
    onChange({ ...skills, [key]: value });

  const setGroups = (groups: ISkillGroup[]) => set('groups', groups);

  return (
    <Card
      title="Навыки"
      actions={
        <>
          <Toggle
            checked={skills.enabled}
            onChange={(v) => set('enabled', v)}
            label="Показывать"
          />
          <Button
            tone="primary"
            onClick={() =>
              setGroups([...skills.groups, { id: newId('grp'), title: 'Новая группа', items: [] }])
            }
          >
            + Группа
          </Button>
        </>
      }
    >
      <Field label="Заголовок секции">
        <TextInput value={skills.heading} onChange={(v) => set('heading', v)} />
      </Field>

      {skills.groups.map((group, index) => (
        <GroupEditor
          key={group.id}
          group={group}
          index={index}
          total={skills.groups.length}
          onChange={(next) => setGroups(replaceAt(skills.groups, index, next))}
          onMove={(to) => setGroups(moveItem(skills.groups, index, to))}
          onRemove={() => setGroups(removeAt(skills.groups, index))}
        />
      ))}
    </Card>
  );
}

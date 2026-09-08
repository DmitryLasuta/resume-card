'use client';

import type { IHero, IHeroAction } from '@/lib/content-types';
import { moveItem, newId, removeAt, replaceAt } from '@/lib/list-utils';

import { Button, Card, Field, RowControls, TextArea, TextInput } from '../ui';

export function HeroEditor({
  hero,
  onChange,
}: {
  hero: IHero;
  onChange: (next: IHero) => void;
}) {
  const set = <K extends keyof IHero>(key: K, value: IHero[K]) =>
    onChange({ ...hero, [key]: value });

  const setActions = (actions: IHeroAction[]) => set('actions', actions);

  const addAction = () =>
    setActions([
      ...hero.actions,
      { id: newId('act'), label: 'Новая кнопка', href: '#', variant: 'ghost' },
    ]);

  return (
    <div className="space-y-5">
      <Card title="Шапка">
        <Field label="Надзаголовок" hint="мелкая строка над именем">
          <TextInput value={hero.eyebrow} onChange={(v) => set('eyebrow', v)} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя">
            <TextInput value={hero.firstName} onChange={(v) => set('firstName', v)} />
          </Field>
          <Field label="Фамилия">
            <TextInput value={hero.lastName} onChange={(v) => set('lastName', v)} />
          </Field>
        </div>
        <Field label="Слоган">
          <TextArea value={hero.tagline} onChange={(v) => set('tagline', v)} rows={3} />
        </Field>
      </Card>

      <Card
        title="Кнопки"
        actions={<Button onClick={addAction}>+ Кнопка</Button>}
      >
        {hero.actions.length === 0 ? (
          <p className="text-sm text-parchment-dim">Кнопок пока нет.</p>
        ) : null}

        {hero.actions.map((action, index) => (
          <div key={action.id} className="rounded-xl border border-line p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-wide text-parchment-dim">
                Кнопка {index + 1}
              </span>
              <RowControls
                canUp={index > 0}
                canDown={index < hero.actions.length - 1}
                onUp={() => setActions(moveItem(hero.actions, index, index - 1))}
                onDown={() => setActions(moveItem(hero.actions, index, index + 1))}
                onRemove={() => setActions(removeAt(hero.actions, index))}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Текст">
                <TextInput
                  value={action.label}
                  onChange={(v) =>
                    setActions(replaceAt(hero.actions, index, { ...action, label: v }))
                  }
                />
              </Field>
              <Field label="Ссылка" hint="https://, mailto:, tel:">
                <TextInput
                  value={action.href}
                  onChange={(v) =>
                    setActions(replaceAt(hero.actions, index, { ...action, href: v }))
                  }
                />
              </Field>
            </div>

            <div className="mt-3 flex gap-2">
              {(['primary', 'ghost'] as const).map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() =>
                    setActions(replaceAt(hero.actions, index, { ...action, variant }))
                  }
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    action.variant === variant
                      ? 'border-brass bg-brass-soft text-brass'
                      : 'border-line text-parchment-dim hover:text-parchment'
                  }`}
                >
                  {variant === 'primary' ? 'Основная' : 'Второстепенная'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

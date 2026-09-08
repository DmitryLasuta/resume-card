'use client';

import type { ChangeEvent, ReactNode } from 'react';

const inputClass =
  'w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-parchment placeholder:text-parchment-dim/60 transition-colors focus:border-brass focus:outline-none';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-parchment-dim">
          {label}
        </span>
        {hint ? <span className="text-xs text-parchment-dim/70">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      className={inputClass}
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
  mono = false,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <textarea
      className={`${inputClass} resize-y leading-relaxed ${mono ? 'font-mono text-xs' : ''}`}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="inline-flex items-center gap-2.5 text-sm text-parchment"
    >
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? 'bg-brass' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink transition-transform ${
            checked ? 'translate-x-4.5' : 'translate-x-0.5'
          }`}
        />
      </span>
      {label}
    </button>
  );
}

export type TButtonTone = 'primary' | 'ghost' | 'danger';

const toneClass: Record<TButtonTone, string> = {
  primary: 'bg-brass text-ink hover:bg-brass/85 disabled:opacity-50',
  ghost: 'border border-line text-parchment hover:border-brass hover:text-brass',
  danger: 'border border-line text-parchment-dim hover:border-red-500/60 hover:text-red-400',
};

export function Button({
  children,
  onClick,
  tone = 'ghost',
  type = 'button',
  disabled = false,
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: TButtonTone;
  type?: 'button' | 'submit';
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${toneClass[tone]}`}
    >
      {children}
    </button>
  );
}

export function Card({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-ink-raised p-5">
      {title || actions ? (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-display text-base text-parchment">{title}</h3>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/** Кнопки порядка и удаления для элемента списка. */
export function RowControls({
  onUp,
  onDown,
  onRemove,
  canUp,
  canDown,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  canUp: boolean;
  canDown: boolean;
}) {
  return (
    <div className="flex shrink-0 gap-1.5">
      <Button onClick={onUp} disabled={!canUp} title="Выше">
        ↑
      </Button>
      <Button onClick={onDown} disabled={!canDown} title="Ниже">
        ↓
      </Button>
      <Button onClick={onRemove} tone="danger" title="Удалить">
        ✕
      </Button>
    </div>
  );
}

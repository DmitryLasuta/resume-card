import type { ReactNode } from 'react';

import { Reveal } from './Reveal';

export interface IProps {
  id: string;
  heading: string;
  children: ReactNode;
  as?: 'section' | 'footer';
}

/** Общий каркас секции: подпись слева, содержимое справа. */
export function Section({ id, heading, children, as = 'section' }: IProps) {
  const Tag = as;
  return (
    <Tag
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:max-w-5xl"
    >
      <Reveal className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[180px_1fr] lg:gap-12">
        <h2 id={`${id}-heading`} className="font-display text-lg italic text-brass">
          {heading}
        </h2>
        {children}
      </Reveal>
    </Tag>
  );
}

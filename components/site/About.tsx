import type { IAboutSection } from '@/lib/content-types';

import { Section } from './Section';

export function About({ about }: { about: IAboutSection }) {
  return (
    <Section id="about" heading={about.heading}>
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-parchment sm:text-xl">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.id}>{paragraph.text}</p>
        ))}
        {about.note ? (
          <p className="text-base text-parchment-dim sm:text-lg">{about.note}</p>
        ) : null}
      </div>
    </Section>
  );
}

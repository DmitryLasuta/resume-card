import type { IExperienceSection } from '@/lib/content-types';

import { ExperienceTimeline } from './ExperienceTimeline';
import { Section } from './Section';

export function Experience({ experience }: { experience: IExperienceSection }) {
  return (
    <Section id="experience" heading={experience.heading}>
      <div className="max-w-2xl space-y-14">
        {experience.items.map((item) => (
          <article key={item.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-display text-2xl text-parchment">{item.role}</p>
              <p className="font-mono text-xs text-parchment-dim">
                {[item.period, item.duration].filter(Boolean).join(' · ')}
              </p>
            </div>
            <p className="mt-1 text-parchment-dim">
              {[item.company, item.location].filter(Boolean).join(' — ')}
            </p>

            {item.summary ? (
              <p className="mt-5 leading-relaxed text-parchment">{item.summary}</p>
            ) : null}

            <ExperienceTimeline highlights={item.highlights} />
          </article>
        ))}
      </div>
    </Section>
  );
}

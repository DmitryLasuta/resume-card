import type { ISkillsSection } from '@/lib/content-types';

import { Reveal } from './Reveal';
import { Section } from './Section';

export function Skills({ skills }: { skills: ISkillsSection }) {
  return (
    <Section id="skills" heading={skills.heading}>
      <div className="max-w-2xl space-y-7">
        {skills.groups.map((group, groupIndex) => (
          <Reveal key={group.id} delayMs={groupIndex * 100}>
            <p className="text-sm font-semibold text-parchment-dim">{group.title}</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-parchment transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:text-brass hover:shadow-[0_8px_20px_-8px_rgba(201,162,39,0.5)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

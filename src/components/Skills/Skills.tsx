import { Reveal } from '../Reveal/Reveal';
import { skillGroups } from '../../data';

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:max-w-5xl"
    >
      <Reveal className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[180px_1fr] lg:gap-12">
        <h2
          id="skills-heading"
          className="font-display text-lg italic text-brass"
        >
          Навыки
        </h2>

        <div className="max-w-2xl space-y-7">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delayMs={groupIndex * 100}>
              <p className="text-sm font-semibold text-parchment-dim">
                {group.title}
              </p>
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
      </Reveal>
    </section>
  );
}

import { Reveal } from '../Reveal/Reveal';
import { location } from '../../data';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:max-w-5xl"
    >
      <Reveal className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[180px_1fr] lg:gap-12">
        <h2
          id="about-heading"
          className="font-display text-lg italic text-brass"
        >
          О себе
        </h2>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-parchment sm:text-xl">
          <p>
            Управляю проектами в аутсорс-разработке — от постановки задачи и
            бюджета до релиза. Специализируюсь на многозадачности: веду
            несколько проектов с пересекающимися командами одновременно, не
            теряя сроков.
          </p>
          <p className="text-base text-parchment-dim sm:text-lg">
            {location}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

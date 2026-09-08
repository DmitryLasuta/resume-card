import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../Reveal/Reveal';
import { experience } from '../../data';

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:max-w-5xl"
    >
      <Reveal className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[180px_1fr] lg:gap-12">
        <h2
          id="experience-heading"
          className="font-display text-lg italic text-brass"
        >
          Опыт
        </h2>

        <div className="max-w-2xl">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-display text-2xl text-parchment">
              {experience.role}
            </p>
            <p className="font-mono text-xs text-parchment-dim">
              {experience.period} · {experience.duration}
            </p>
          </div>
          <p className="mt-1 text-parchment-dim">
            {experience.company} — {experience.location}
          </p>

          <p className="mt-5 leading-relaxed text-parchment">
            {experience.summary}
          </p>

          <ol ref={listRef} className="relative mt-8 space-y-7 pl-7">
            <svg
              aria-hidden="true"
              className="absolute left-0 top-1 h-[calc(100%-8px)] w-px"
              preserveAspectRatio="none"
            >
              <line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                stroke="var(--color-line)"
                strokeWidth="1"
              />
              <line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                stroke="var(--color-brass)"
                strokeWidth="1"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={isDrawn ? 0 : 1}
                style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s' }}
              />
            </svg>

            {experience.highlights.map((item, index) => (
              <li key={item.label} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-7 top-1.5 h-2 w-2 rounded-full bg-brass transition-transform duration-500"
                  style={{
                    transform: isDrawn ? 'scale(1)' : 'scale(0)',
                    transitionDelay: `${0.2 + index * 0.25}s`,
                  }}
                />
                <p className="font-semibold text-parchment">{item.label}</p>
                <p className="mt-1 text-parchment-dim">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

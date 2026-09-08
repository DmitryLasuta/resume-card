import type { IHero } from '@/lib/content-types';

export function Hero({ hero }: { hero: IHero }) {
  return (
    <header className="relative overflow-hidden px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20 lg:pt-32">
      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-brass/10 blur-3xl sm:h-[560px] sm:w-[560px]"
      />

      <div className="relative mx-auto max-w-3xl lg:max-w-5xl">
        {hero.eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
            {hero.eyebrow}
          </p>
        ) : null}

        <h1 className="mt-4 font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-parchment sm:text-6xl lg:text-7xl">
          {hero.firstName}
          {hero.lastName ? (
            <>
              <br />
              {hero.lastName}
            </>
          ) : null}
        </h1>

        <span className="animate-underline mt-6 block h-px w-24 bg-brass" />

        {hero.tagline ? (
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-parchment-dim sm:text-xl">
            {hero.tagline}
          </p>
        ) : null}

        {hero.actions.length > 0 ? (
          <div className="mt-9 flex flex-wrap gap-4">
            {hero.actions.map((action) =>
              action.variant === 'primary' ? (
                <a
                  key={action.id}
                  href={action.href}
                  className="group relative overflow-hidden rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                >
                  <span className="relative z-10">{action.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-parchment transition-transform duration-500 ease-out group-hover:translate-x-0"
                  />
                </a>
              ) : (
                <a
                  key={action.id}
                  href={action.href}
                  className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-parchment transition-colors duration-300 hover:border-brass hover:text-brass"
                >
                  {action.label}
                </a>
              ),
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}

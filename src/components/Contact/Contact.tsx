import { Reveal } from '../Reveal/Reveal';
import { contactLinks } from '../../data';

export function Contact() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:max-w-5xl"
    >
      <Reveal className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[180px_1fr] lg:gap-12">
        <h2
          id="contact-heading"
          className="font-display text-lg italic text-brass"
        >
          Контакты
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative flex flex-col gap-0.5 overflow-hidden rounded-xl border border-line px-5 py-4 transition-colors duration-300 hover:border-brass sm:min-w-[190px]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-y-full bg-brass-soft transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
              <span className="relative font-mono text-xs uppercase tracking-wide text-parchment-dim group-hover:text-brass">
                {link.label}
              </span>
              <span className="relative font-medium text-parchment">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <p className="mt-14 border-t border-line pt-6 text-sm text-parchment-dim">
        © {new Date().getFullYear()} Александра Колыхалова
      </p>
    </footer>
  );
}

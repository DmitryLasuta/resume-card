import type { IContactSection } from '@/lib/content-types';

import { Section } from './Section';

export function Contact({ contact }: { contact: IContactSection }) {
  return (
    <>
      <Section id="contact" heading={contact.heading} as="footer">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {contact.links.map((link) => (
            <a
              key={link.id}
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
              <span className="relative font-medium text-parchment">{link.value}</span>
            </a>
          ))}
        </div>
      </Section>

      <div className="mx-auto max-w-3xl px-5 pb-14 sm:px-8 lg:max-w-5xl">
        <p className="border-t border-line pt-6 text-sm text-parchment-dim">
          © {new Date().getFullYear()} {contact.footerName}
        </p>
      </div>
    </>
  );
}

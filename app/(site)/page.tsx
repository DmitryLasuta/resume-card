import { About } from '@/components/site/About';
import { Contact } from '@/components/site/Contact';
import { Experience } from '@/components/site/Experience';
import { Hero } from '@/components/site/Hero';
import { Skills } from '@/components/site/Skills';
import { getPublicContent } from '@/lib/content';

export default async function HomePage() {
  const content = await getPublicContent();

  return (
    <main className="min-h-screen bg-ink text-parchment">
      <Hero hero={content.hero} />
      {content.about.enabled ? <About about={content.about} /> : null}
      {content.experience.enabled ? <Experience experience={content.experience} /> : null}
      {content.skills.enabled ? <Skills skills={content.skills} /> : null}
      {content.contact.enabled ? <Contact contact={content.contact} /> : null}
    </main>
  );
}

import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Skills } from './components/Skills/Skills';
import { Contact } from './components/Contact/Contact';

export function App() {
  return (
    <main className="min-h-screen bg-ink text-parchment">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}

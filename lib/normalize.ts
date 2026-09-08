import { defaultContent } from './default-content';
import type {
  IAboutSection,
  IContactLink,
  IContactSection,
  IContent,
  IExperienceHighlight,
  IExperienceItem,
  IExperienceSection,
  IHero,
  IHeroAction,
  IParagraph,
  ISiteMeta,
  ISkillGroup,
  ISkillsSection,
  TActionVariant,
} from './content-types';

/**
 * Приводит произвольный JSON к схеме IContent: недостающие поля берутся из
 * defaultContent, лишние отбрасываются, типы принудительно приводятся.
 * Заменяет схему-валидатор, чтобы не тянуть лишнюю зависимость.
 */

const MAX_LEN = 4000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function str(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  return value.slice(0, MAX_LEN);
}

function bool(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function arr(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

let idCounter = 0;

function id(value: unknown, prefix: string): string {
  if (typeof value === 'string' && value.trim()) return value.trim().slice(0, 64);
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

function mapList<T>(value: unknown, fallback: T[], map: (raw: Record<string, unknown>) => T): T[] {
  const raw = arr(value);
  if (raw.length === 0) return value === undefined ? fallback : [];
  return raw.filter(isRecord).map(map);
}

function meta(value: unknown): ISiteMeta {
  const d = defaultContent.meta;
  const v = isRecord(value) ? value : {};
  return {
    title: str(v.title, d.title),
    description: str(v.description, d.description),
    siteName: str(v.siteName, d.siteName),
    ogTitle: str(v.ogTitle, d.ogTitle),
    ogDescription: str(v.ogDescription, d.ogDescription),
    ogImage: str(v.ogImage, d.ogImage),
    url: str(v.url, d.url),
    locale: str(v.locale, d.locale),
  };
}

function heroAction(raw: Record<string, unknown>): IHeroAction {
  const variant: TActionVariant = raw.variant === 'ghost' ? 'ghost' : 'primary';
  return {
    id: id(raw.id, 'act'),
    label: str(raw.label, ''),
    href: str(raw.href, '#'),
    variant,
  };
}

function hero(value: unknown): IHero {
  const d = defaultContent.hero;
  const v = isRecord(value) ? value : {};
  return {
    eyebrow: str(v.eyebrow, d.eyebrow),
    firstName: str(v.firstName, d.firstName),
    lastName: str(v.lastName, d.lastName),
    tagline: str(v.tagline, d.tagline),
    actions: mapList(v.actions, d.actions, heroAction),
  };
}

function paragraph(raw: Record<string, unknown>): IParagraph {
  return { id: id(raw.id, 'p'), text: str(raw.text, '') };
}

function about(value: unknown): IAboutSection {
  const d = defaultContent.about;
  const v = isRecord(value) ? value : {};
  return {
    enabled: bool(v.enabled, d.enabled),
    heading: str(v.heading, d.heading),
    paragraphs: mapList(v.paragraphs, d.paragraphs, paragraph),
    note: str(v.note, d.note),
  };
}

function highlight(raw: Record<string, unknown>): IExperienceHighlight {
  return {
    id: id(raw.id, 'hl'),
    label: str(raw.label, ''),
    detail: str(raw.detail, ''),
  };
}

function experienceItem(raw: Record<string, unknown>): IExperienceItem {
  return {
    id: id(raw.id, 'exp'),
    company: str(raw.company, ''),
    role: str(raw.role, ''),
    period: str(raw.period, ''),
    duration: str(raw.duration, ''),
    location: str(raw.location, ''),
    summary: str(raw.summary, ''),
    highlights: mapList(raw.highlights, [], highlight),
  };
}

function experience(value: unknown): IExperienceSection {
  const d = defaultContent.experience;
  const v = isRecord(value) ? value : {};
  return {
    enabled: bool(v.enabled, d.enabled),
    heading: str(v.heading, d.heading),
    items: mapList(v.items, d.items, experienceItem),
  };
}

function skillGroup(raw: Record<string, unknown>): ISkillGroup {
  return {
    id: id(raw.id, 'grp'),
    title: str(raw.title, ''),
    items: arr(raw.items)
      .map((item) => str(item, ''))
      .filter((item) => item.trim().length > 0),
  };
}

function skills(value: unknown): ISkillsSection {
  const d = defaultContent.skills;
  const v = isRecord(value) ? value : {};
  return {
    enabled: bool(v.enabled, d.enabled),
    heading: str(v.heading, d.heading),
    groups: mapList(v.groups, d.groups, skillGroup),
  };
}

function contactLink(raw: Record<string, unknown>): IContactLink {
  return {
    id: id(raw.id, 'ct'),
    label: str(raw.label, ''),
    value: str(raw.value, ''),
    href: str(raw.href, '#'),
  };
}

function contact(value: unknown): IContactSection {
  const d = defaultContent.contact;
  const v = isRecord(value) ? value : {};
  return {
    enabled: bool(v.enabled, d.enabled),
    heading: str(v.heading, d.heading),
    links: mapList(v.links, d.links, contactLink),
    footerName: str(v.footerName, d.footerName),
  };
}

export function normalizeContent(input: unknown): IContent {
  const v = isRecord(input) ? input : {};
  return {
    meta: meta(v.meta),
    hero: hero(v.hero),
    about: about(v.about),
    experience: experience(v.experience),
    skills: skills(v.skills),
    contact: contact(v.contact),
  };
}

/** Схема контента резюме. Всё, что здесь описано, редактируется из админки. */

export interface IIdentified {
  id: string;
}

export type TActionVariant = 'primary' | 'ghost';

export interface IHeroAction extends IIdentified {
  label: string;
  href: string;
  variant: TActionVariant;
}

export interface IHero {
  eyebrow: string;
  firstName: string;
  lastName: string;
  tagline: string;
  actions: IHeroAction[];
}

export interface IParagraph extends IIdentified {
  text: string;
}

export interface IAboutSection {
  enabled: boolean;
  heading: string;
  paragraphs: IParagraph[];
  note: string;
}

export interface IExperienceHighlight extends IIdentified {
  label: string;
  detail: string;
}

export interface IExperienceItem extends IIdentified {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  summary: string;
  highlights: IExperienceHighlight[];
}

export interface IExperienceSection {
  enabled: boolean;
  heading: string;
  items: IExperienceItem[];
}

export interface ISkillGroup extends IIdentified {
  title: string;
  items: string[];
}

export interface ISkillsSection {
  enabled: boolean;
  heading: string;
  groups: ISkillGroup[];
}

export interface IContactLink extends IIdentified {
  label: string;
  value: string;
  href: string;
}

export interface IContactSection {
  enabled: boolean;
  heading: string;
  links: IContactLink[];
  footerName: string;
}

export interface ISiteMeta {
  title: string;
  description: string;
  siteName: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  url: string;
  locale: string;
}

export interface IContent {
  meta: ISiteMeta;
  hero: IHero;
  about: IAboutSection;
  experience: IExperienceSection;
  skills: ISkillsSection;
  contact: IContactSection;
}

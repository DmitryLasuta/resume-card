export type TSkillGroupId = 'process' | 'tools' | 'domains';

export interface ISkillGroup {
  id: TSkillGroupId;
  title: string;
  items: string[];
}

export interface IExperienceHighlight {
  label: string;
  detail: string;
}

export interface IExperience {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  summary: string;
  highlights: IExperienceHighlight[];
}

export interface IContactLink {
  label: string;
  value: string;
  href: string;
}

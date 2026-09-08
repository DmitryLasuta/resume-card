import type { IContactLink, IExperience, ISkillGroup } from './types';

export const experience: IExperience = {
  company: 'Софтлекс',
  role: 'Project Manager',
  period: 'Июль 2025 — Август 2026',
  duration: '1 год 2 месяца',
  location: 'Новороссийск · аутсорс-разработка',
  summary:
    'Координировала кросс-функциональную команду до 10 человек (backend, frontend, QA, тех. писатель, DevOps) на нескольких параллельных проектах: сервис такси, сервис трезвого водителя, AI-платформа для контента, система автоматизации покерных игр.',
  highlights: [
    {
      label: 'Планирование',
      detail:
        'Формировала спринты на основе приоритетов бэклога, декомпозировала задачи, согласовывала оценки, сроки и бюджет с заказчиком.',
    },
    {
      label: 'Работа с клиентами',
      detail:
        'Вела проекты от концепции до релиза, разрешала конфликтные ситуации с подрядчиками и фиксировала договорённости по контрольным точкам.',
    },
    {
      label: 'Параллельные проекты',
      detail:
        'Распределяла ресурсы между двумя проектами с общей командой, синхронизировала графики встреч и приоритеты без потери сроков.',
    },
  ],
};

export const skillGroups: ISkillGroup[] = [
  {
    id: 'process',
    title: 'Процессы',
    items: [
      'Agile / Scrum / Kanban',
      'Планирование и декомпозиция задач',
      'Контроль сроков',
      'Управление рисками',
      'Планирование бюджета',
      'Отчётность',
    ],
  },
  {
    id: 'tools',
    title: 'Инструменты',
    items: ['Jira', 'CRM-система', 'SQL', 'API', 'CI/CD'],
  },
  {
    id: 'domains',
    title: 'Компетенции',
    items: [
      'Жизненный цикл проекта (SDLC)',
      'Управление коммуникациями',
      'Работа с документацией',
      'Коммуникация с командой и заказчиком',
    ],
  },
];

export const contactLinks: IContactLink[] = [
  {
    label: 'Telegram',
    value: '@ALXDMTRNK',
    href: 'https://t.me/ALXDMTRNK',
  },
  {
    label: 'Email',
    value: 'aleksandradomeichik@gmail.com',
    href: 'mailto:aleksandradomeichik@gmail.com',
  },
  {
    label: 'Телефон',
    value: '+375 (25) 756-63-44',
    href: 'tel:+375257566344',
  },
];

export const location = 'Минск (м. Восток) · готова к переезду в Россию, открыта к командировкам';

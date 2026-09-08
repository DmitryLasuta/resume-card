import type { IContent } from './content-types';

/**
 * Значения по умолчанию. Используются при первом запуске, пока в хранилище
 * ничего нет, и как база для слияния при валидации входящего JSON.
 */
export const defaultContent: IContent = {
  meta: {
    title: 'Александра Колыхалова — Project Manager',
    description:
      'Александра Колыхалова — Project Manager. Управление командами разработки, Agile, координация клиентов и подрядчиков.',
    siteName: 'Александра Колыхалова',
    ogTitle: 'Александра Колыхалова — Project Manager',
    ogDescription:
      'Веду проекты и команды в аутсорс-разработке — от постановки задачи и бюджета до релиза.',
    ogImage: '/og-image.png',
    url: 'https://alexandra-resume-card.vercel.app',
    locale: 'ru_RU',
  },
  hero: {
    eyebrow: 'Project Manager',
    firstName: 'Александра',
    lastName: 'Колыхалова',
    tagline:
      'Веду проекты и команды в аутсорс-разработке — от постановки задачи и бюджета до релиза.',
    actions: [
      {
        id: 'act-telegram',
        label: 'Написать в Telegram',
        href: 'https://t.me/ALXDMTRNK',
        variant: 'primary',
      },
      {
        id: 'act-email',
        label: 'Написать на почту',
        href: 'mailto:aleksandradomeichik@gmail.com',
        variant: 'ghost',
      },
    ],
  },
  about: {
    enabled: true,
    heading: 'О себе',
    paragraphs: [
      {
        id: 'p-1',
        text: 'Управляю проектами в аутсорс-разработке — от постановки задачи и бюджета до релиза. Специализируюсь на многозадачности: веду несколько проектов с пересекающимися командами одновременно, не теряя сроков.',
      },
    ],
    note: 'Минск (м. Восток) · готова к переезду в Россию, открыта к командировкам',
  },
  experience: {
    enabled: true,
    heading: 'Опыт',
    items: [
      {
        id: 'exp-softlex',
        company: 'Софтлекс',
        role: 'Project Manager',
        period: 'Июль 2025 — Август 2026',
        duration: '1 год 2 месяца',
        location: 'Новороссийск · аутсорс-разработка',
        summary:
          'Координировала кросс-функциональную команду до 10 человек (backend, frontend, QA, тех. писатель, DevOps) на нескольких параллельных проектах: сервис такси, сервис трезвого водителя, AI-платформа для контента, система автоматизации покерных игр.',
        highlights: [
          {
            id: 'hl-planning',
            label: 'Планирование',
            detail:
              'Формировала спринты на основе приоритетов бэклога, декомпозировала задачи, согласовывала оценки, сроки и бюджет с заказчиком.',
          },
          {
            id: 'hl-clients',
            label: 'Работа с клиентами',
            detail:
              'Вела проекты от концепции до релиза, разрешала конфликтные ситуации с подрядчиками и фиксировала договорённости по контрольным точкам.',
          },
          {
            id: 'hl-parallel',
            label: 'Параллельные проекты',
            detail:
              'Распределяла ресурсы между двумя проектами с общей командой, синхронизировала графики встреч и приоритеты без потери сроков.',
          },
        ],
      },
    ],
  },
  skills: {
    enabled: true,
    heading: 'Навыки',
    groups: [
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
    ],
  },
  contact: {
    enabled: true,
    heading: 'Контакты',
    links: [
      {
        id: 'ct-telegram',
        label: 'Telegram',
        value: '@ALXDMTRNK',
        href: 'https://t.me/ALXDMTRNK',
      },
      {
        id: 'ct-email',
        label: 'Email',
        value: 'aleksandradomeichik@gmail.com',
        href: 'mailto:aleksandradomeichik@gmail.com',
      },
      {
        id: 'ct-phone',
        label: 'Телефон',
        value: '+375 (25) 756-63-44',
        href: 'tel:+375257566344',
      },
    ],
    footerName: 'Александра Колыхалова',
  },
};

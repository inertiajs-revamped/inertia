import type { DemoApp } from '@/theme/components/Card.vue'

export const demoApps = [
  {
    title: 'Ping CRM',
    badge: 'react',
    description:
      'A demo application to illustrate how Inertia.js-Revamped works.',
    integrations: ['laravel', 'react'],
    image: '/assets/pingcrm-screenshot.png',
    url: 'https://github.com/inertiajs-revamped/pingcrm/tree/main/pingcrm-react#readme',
  },
  {
    title: 'Ping CRM',
    badge: 'vue',
    description:
      'A demo application to illustrate how Inertia.js-Revamped works.',
    integrations: ['laravel', 'vue'],
    image: '/assets/pingcrm-screenshot.png',
    url: 'https://github.com/inertiajs-revamped/pingcrm/tree/main/pingcrm-vue#readme',
  },
  {
    title: 'Ping CRM',
    badge: 'preact',
    description:
      'A demo application to illustrate how Inertia.js-Revamped works.',
    integrations: ['laravel', 'preact'],
    image: '/assets/pingcrm-screenshot.png',
    url: 'https://github.com/inertiajs-revamped/pingcrm/tree/main/pingcrm-preact#readme',
  },
] satisfies DemoApp[]

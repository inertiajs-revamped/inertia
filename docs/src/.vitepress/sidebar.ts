import type { DefaultTheme } from 'vitepress'

export const sidebarConfig = {
  '/guide/': [
    {
      text: 'Getting started',
      items: [
        {
          text: 'Introduction',
          link: '/guide/getting-started/introduction',
        },
        { text: 'Quick Start', link: '/guide/getting-started/quick-start' },
        {
          text: 'Core Concepts',
          link: '/guide/getting-started/core-concepts',
        },
        {
          text: 'Migration',
          link: '/guide/getting-started/migration',
        },
      ],
    },
  ],
  '/api/': [
    {
      text: 'API Reference',
      items: [
        {
          text: 'Overview',
          link: '/api/',
        },
        {
          text: 'Preset CLI',
          link: '/api/preset-cli',
        },
      ],
    },
  ],
} satisfies DefaultTheme.Sidebar

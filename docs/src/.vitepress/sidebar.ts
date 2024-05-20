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
          text: 'Demo Application',
          link: '/guide/getting-started/demo-application',
        },
        {
          text: 'Migration Guide',
          link: '/guide/getting-started/migration',
        },
      ],
    },
    {
      text: 'Integrations',
      items: [
        {
          text: 'Laravel',
          collapsed: true,
          items: [
            {
              text: 'Installation',
              link: '/guide/integrations/laravel/installation',
            },
          ],
        },
      ],
    },
    {
      text: 'UI Frameworks',
      items: [
        {
          text: 'Preact',
          collapsed: true,
          items: [
            {
              text: 'Installation',
              link: '/guide/ui-frameworks/preact/installation',
            },
          ],
        },
        {
          text: 'React',
          collapsed: true,
          items: [
            {
              text: 'Installation',
              link: '/guide/ui-frameworks/react/installation',
            },
          ],
        },
        {
          text: 'Vue',
          collapsed: true,
          items: [
            {
              text: 'Installation',
              link: '/guide/ui-frameworks/vue/installation',
            },
          ],
        },
      ],
    },
    {
      text: 'Basics',
      collapsed: true,
      items: [
        {
          text: 'Project Structure',
          link: '/guide/basics/project-structure',
        },
      ],
    },
    {
      text: 'Hooks',
      collapsed: true,
      items: [
        {
          text: 'usePage',
          link: '/guide/ui-frameworks/react/hooks/use-page',
        },
        {
          text: 'useForm',
          link: '/guide/ui-frameworks/react/hooks/use-form',
        },
        {
          text: 'useRemember',
          link: '/guide/ui-frameworks/react/hooks/use-remember',
        },
        {
          text: 'withLayout',
          link: '/guide/ui-frameworks/react/hooks/with-layout',
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

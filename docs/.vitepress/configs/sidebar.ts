import type { DefaultTheme } from 'vitepress'

const defaultSidebar = [
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
    ],
  },
] satisfies DefaultTheme.Sidebar

const extraSidebar = [
  {
    text: 'Resources',
    collapsed: true,
    items: [
      {
        text: 'Contributing',
        link: '/guide/resources/contributing',
      },
    ],
  },
] satisfies DefaultTheme.Sidebar

const rawSidebar = {
  text: 'Integrations',
  collapsed: false,
  items: [
    {
      text: 'Overview',
      link: '/integrations/',
    },
  ],
}

const adapterSidebar = (adapter: string) =>
  [
    {
      text: 'Getting Started',
      collapsed: false,
      base: `/integrations/${adapter}`,
      items: [
        {
          text: 'Quick Start',
          link: '/',
        },
        {
          text: 'Project Structure',
          link: '/basics/project-structure',
        },
        {
          text: 'Migration Guide',
          link: '/basics/migration',
        },
      ],
    },
    {
      text: 'Installation',
      collapsed: false,
      base: `/integrations/${adapter}`,
      items: [
        {
          text: 'Laravel Setup',
          link: '/installation/laravel-setup',
        },
        {
          text: 'Client-side Setup',
          link: '/installation/client-side-setup',
        },
      ],
    },
    {
      text: 'Basics',
      collapsed: false,
      base: `/integrations/${adapter}`,
      items: [
        {
          text: 'Pages',
          link: '/basics/pages',
        },
        {
          text: 'Layouts',
          link: '/basics/layouts',
        },
        {
          text: 'Shared data',
          link: '/basics/shared-data',
        },
      ],
    },
    {
      text: 'Components',
      collapsed: false,
      base: `/integrations/${adapter}`,
      items: [
        {
          text: 'Head',
          link: '/components/head',
        },
        {
          text: 'Link',
          link: '/components/link',
        },
      ],
    },
    {
      text: adapter === 'vue' ? 'Composables' : 'Hooks',
      collapsed: false,
      base: `/integrations/${adapter}`,
      items: [
        {
          text: 'usePage',
          link: `${adapter === 'vue' ? '/composables' : '/hooks'}/use-page`,
        },
        {
          text: 'useForm',
          link: `${adapter === 'vue' ? '/composables' : '/hooks'}/use-form`,
        },
        {
          text: 'useRemember',
          link: `${adapter === 'vue' ? '/composables' : '/hooks'}/use-remember`,
        },
        {
          text: 'withLayout',
          link: `${adapter === 'vue' ? '/composables' : '/hooks'}/with-layout`,
        },
      ],
    },
  ] satisfies DefaultTheme.Sidebar

export const sidebarConfig = {
  '/guide/': [...defaultSidebar, rawSidebar, ...extraSidebar],
  '/integrations/': [...defaultSidebar, rawSidebar, ...extraSidebar],
  '/integrations/preact/': adapterSidebar('preact'),
  '/integrations/react/': adapterSidebar('react'),
  '/integrations/vue/': adapterSidebar('vue'),
} satisfies DefaultTheme.Sidebar

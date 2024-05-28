import type { DefaultTheme } from 'vitepress'
import { defaultConfig } from './constants'

export const navConfig = [
  {
    text: 'Guide',
    link: '/guide/getting-started/introduction',
    activeMatch: '/guide/',
  },
  {
    text: 'Integrations',
    link: '/integrations/',
    activeMatch: '/integrations/',
  },
  { text: 'API', link: '/api/', activeMatch: '/api/' },
  {
    text: 'Resources',
    items: [
      {
        text: 'Useful links',
        items: [
          {
            text: 'Discord',
            link: defaultConfig.discord,
          },
          {
            text: 'Contributing',
            link: `${defaultConfig.github.repo}/blob/main/CONTRIBUTING.md`,
          },
          { text: 'Repository', link: `${defaultConfig.github.repo}` },
        ],
      },
    ],
  },
] satisfies DefaultTheme.NavItem[]

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
  {
    text: 'Resources',
    items: [
      {
        text: 'Discord',
        link: defaultConfig.discord,
      },
      { text: 'Repository', link: `${defaultConfig.github.repo}` },
      {
        text: 'Contributing',
        link: `${defaultConfig.github.repo}/blob/main/CONTRIBUTING.md`,
      },
    ],
  },
] satisfies DefaultTheme.NavItem[]

import { defineConfig } from 'vitepress'
import { version } from '../../../packages/core/package.json'
import { defaultConfig } from './constants'
import { headConfig } from './head'
import { sidebarConfig } from './sidebar'

const isProduction = process.env.NODE_ENV === 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: defaultConfig.title,
  description: defaultConfig.description,
  outDir: '../dist',
  appearance: true,
  lastUpdated: true,
  cleanUrls: true,
  head: headConfig,
  themeConfig: {
    sidebar: sidebarConfig,
    nav: [
      {
        text: 'Guide',
        link: '/guide/getting-started/introduction',
        activeMatch: '/guide/',
      },
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      {
        text: 'Resources',
        items: [
          {
            text: `v${version}`,
            items: [
              {
                text: 'Release Notes',
                link: `${defaultConfig.github.repo}/releases`,
              },
              {
                text: 'Contributing',
                link: `${defaultConfig.github.repo}/blob/main/CONTRIBUTING.md`,
              },
            ],
          },
          {
            text: 'Useful links',
            items: [
              {
                text: 'Discord',
                link: defaultConfig.discord,
              },
              { text: 'Repository', link: `${defaultConfig.github.repo}` },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      { icon: 'discord', link: defaultConfig.discord },
      { icon: 'github', link: defaultConfig.github.repo },
    ],
    editLink: {
      pattern: `${defaultConfig.github.repo}/tree/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: `Released under the <a href="${defaultConfig.github.repo}/blob/main/LICENSE">MIT License</a>.`,
      copyright: `Copyright © ${new Date().getFullYear()} <a href="${
        defaultConfig.url
      }">${defaultConfig.title}</a> & Contributors.`,
    },
  },
  ...(isProduction && {
    sitemap: {
      hostname: 'https://inertiajs-revamped.com',
    },
  }),
})

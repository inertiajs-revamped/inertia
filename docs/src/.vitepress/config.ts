import { defineConfig } from 'vitepress'
import { version } from '../../../packages/core/package.json'

const defaultConfig = {
  docs: 'https://inertiajs-revamped.com',
  discord: 'https://discord.gg/Hn5bDDvTKX',
  github: {
    org: 'https://github.com/inertiajs-revamped',
    repo: 'https://github.com/inertiajs-revamped/inertia',
  },
}

const currentYear = new Date().getFullYear()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Inertia.js-Revamped',
  description: 'Build classic server-side rendered applications',

  appearance: true,
  lastUpdated: true,
  cleanUrls: true,

  outDir: '../dist',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
                text: 'Release Notes ',
                link: `${defaultConfig.github.repo}/releases`,
              },
              {
                text: 'Contributing ',
                link: `${defaultConfig.github.repo}/blob/main/CONTRIBUTING.md`,
              },
            ],
          },
          {
            text: 'Useful links',
            items: [
              {
                text: 'Discord ',
                link: defaultConfig.discord,
              },
              { text: 'Repository', link: `${defaultConfig.github.repo}` },
            ],
          },
        ],
      },
    ],

    sidebar: {
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
    },

    socialLinks: [
      { icon: 'discord', link: defaultConfig.discord },
      { icon: 'github', link: defaultConfig.github.repo },
    ],

    editLink: {
      pattern: `${defaultConfig.github.repo}/tree/main/packages/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: `Released under the <a href="${defaultConfig.github.repo}/blob/main/LICENSE">MIT License</a>.`,
      copyright: `Copyright © ${currentYear} <a href="${defaultConfig.docs}">Inertia.js-Revamped</a> & Contributors.`,
    },
  },
  sitemap: {
    hostname: 'https://inertiajs-revamped.com',
  },
})

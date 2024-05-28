import type { HeadConfig } from 'vitepress'
import { defaultConfig } from './constants'

export const headConfig = [
  [
    'meta',
    {
      property: 'og:locale',
      content: 'en_US',
    },
  ],
  [
    'meta',
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  [
    'meta',
    {
      property: 'og:site_name',
      content: `${defaultConfig.title} Docs`,
    },
  ],
  [
    'meta',
    {
      property: 'og:title',
      content: defaultConfig.title,
    },
  ],
  [
    'meta',
    {
      property: 'og:description',
      content: defaultConfig.description,
    },
  ],
  [
    'meta',
    {
      property: 'og:url',
      content: defaultConfig.url,
    },
  ],
  /* [
    'meta',
    {
      property: 'og:image',
      content: `${defaultConfig.url}/og.png`,
    },
  ],
  [
    'meta',
    {
      property: 'og:image:width',
      content: '1200',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:height',
      content: '630',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:type',
      content: 'image/png',
    },
  ], */
  [
    'meta',
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:title',
      content: `${defaultConfig.title} Docs`,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:description',
      content: defaultConfig.description,
    },
  ],
  /* [
    'meta',
    {
      property: 'twitter:image',
      content: `${defaultConfig.url}/og.png`,
    },
  ], */
] satisfies HeadConfig[]

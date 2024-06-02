import {
  description as laravelDesc,
  version as laravelVersion,
} from '../../../packages/laravel/package.json'
import {
  description as preactDesc,
  version as preactVersion,
} from '../../../packages/preact/package.json'
import {
  description as reactDesc,
  version as reactVersion,
} from '../../../packages/react/package.json'
import {
  description as vueDesc,
  version as vueVersion,
} from '../../../packages/vue/package.json'

import type { Integration } from '../types'

export const integrations = [
  {
    name: 'preact',
    title: 'Preact',
    description: preactDesc,
    version: preactVersion,
    url: 'https://preactjs.com',
    componentExt: 'tsx',
  },
  {
    name: 'react',
    title: 'React',
    description: reactDesc,
    version: reactVersion,
    url: 'https://react.dev',
    componentExt: 'tsx',
  },
  {
    name: 'vue',
    title: 'Vue',
    description: vueDesc,
    version: vueVersion,
    url: 'https://vuejs.org',
    componentExt: 'vue',
  },
  {
    name: 'laravel',
    title: 'Laravel',
    description: laravelDesc,
    version: laravelVersion,
    url: 'https://laravel.com',
    componentExt: 'vue',
  },
] satisfies Integration[]

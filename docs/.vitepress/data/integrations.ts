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

import type { Integration } from '@/theme/composables/useIntegrations'

export const integrations = [
  {
    name: 'preact',
    description: preactDesc,
    version: preactVersion,
  },
  {
    name: 'react',
    description: reactDesc,
    version: reactVersion,
  },
  {
    name: 'vue',
    description: vueDesc,
    version: vueVersion,
  },
] satisfies Integration[]

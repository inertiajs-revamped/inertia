<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegrations } from '@/theme/composables/useIntegrations'
import { capitalize } from '@/utils'

const integrations = useIntegrations()
const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = integrations.filter((pkg) => pkg.name === urlParts[1])[0]
</script>

## Installation

Install the Inertia.js-Revamped {{ capitalize(adapter.name) }} framework adapter:

::: code-group

```shell-vue [npm]
npm install --save-dev @inertiajs-revamped/{{ adapter.name }}
```

```shell-vue [pnpm]
pnpm add -D @inertiajs-revamped/{{ adapter.name }}
```

```shell-vue [yarn]
yarn add -D @inertiajs-revamped/{{ adapter.name }}
```

```shell-vue [bun]
bun add -D @inertiajs-revamped/{{ adapter.name }}
```

:::

### Initialize the Revamped app

1. Delete the `resources/js` directory.
2. Create `resources/application/main.{ts,tsx}` and initialize the main entry-point.
3. (Optional): Create `resources/application/ssr.{ts,tsx}` and initialize the server entry-point.
4. Create a `vite.config.ts`, install, and configure [Vite](https://vitejs.dev/).
5. (Optional): Create `tsconfig.json`, install, and configure [TypeScript](https://www.typescriptlang.org/).

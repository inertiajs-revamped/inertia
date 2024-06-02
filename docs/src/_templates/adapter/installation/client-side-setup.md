<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
const isVue = adapter.name === 'vue'
</script>

# Client-side Setup

This document will guide you through the setup of the <a :href="adapter.url">{{ adapter.title }}</a> framework adapter.

## Installation

Install the Inertia.js-Revamped {{ adapter.title }} framework adapter:

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

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [main.tsx]
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/preact'
import { createProgress } from '@inertiajs-revamped/preact/progress'
import { hydrate } from 'preact'

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    hydrate(<App {...props} />, el!)
  },
  progress: () =>
    createProgress({
      color: '#4B5563',
    }),
})
```

```tsx [ssr.tsx]
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/preact'
import { createServer } from '@inertiajs-revamped/preact/server'
import renderToString from 'preact-render-to-string'

createServer((page) =>
  createInertiaApp({
    page,
    title: (title) => `${title} - Starter kit`,
    render: renderToString,
    resolve: (name) =>
      resolvePageComponent(
        `../pages/${name}.tsx`,
        import.meta.glob('../pages/**/*.tsx')
      ),
    setup: ({ App, props }) => <App {...props} />,
  })
)
```

```typescript [vite.config.ts]
import preact from '@preact/preset-vite'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      /** Main entrypoint */
      input: ['resources/application/main.tsx'],
      /** SSR entrypoint (optional) */
      ssr: 'resources/application/ssr.tsx',
      refresh: true,
    }),
    preact(),
  ]
})
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/*"]
    }
  },
  "include": ["resources/**/*"],
  "exclude": ["node_modules", "public", "vendor"]
}
```

:::

  </template>
  <template #react>

::: code-group

```tsx [main.tsx]
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    hydrateRoot(
      el!,
      <StrictMode>
        <App {...props} />
      </StrictMode>
    )
  },
  progress: () =>
    createProgress({
      color: '#4B5563',
    }),
})
```

```tsx [ssr.tsx]
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createServer } from '@inertiajs-revamped/react/server'
import { renderToString } from 'react-dom/server'

createServer((page) =>
  createInertiaApp({
    page,
    title: (title) => `${title} - Starter kit`,
    render: renderToString,
    resolve: (name) =>
      resolvePageComponent(
        `../pages/${name}.tsx`,
        import.meta.glob('../pages/**/*.tsx')
      ),
    setup: ({ App, props }) => <App {...props} />,
  })
)
```

```typescript [vite.config.ts]
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      /** Main entrypoint */
      input: ['resources/application/main.tsx'],
      /** SSR entrypoint (optional) */
      ssr: 'resources/application/ssr.tsx',
      refresh: true,
    }),
    react(),
  ]
})
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/*"]
    }
  },
  "include": ["resources/**/*"],
  "exclude": ["node_modules", "public", "vendor"]
}
```

:::

  </template>
  <template #vue>

::: code-group

```typescript [main.ts]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue'
import { createProgress } from '@inertiajs-revamped/vue/progress'
import { createApp, h } from 'vue'

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob('../pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el!)
  },
  progress: () =>
    createProgress({
      color: '#4B5563',
    }),
})
```

```typescript [ssr.ts]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue'
import { createServer } from '@inertiajs-revamped/vue/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'

createServer((page) =>
  createInertiaApp({
    page,
    title: (title) => `${title} - Starter kit`,
    render: renderToString,
    resolve: (name) =>
      resolvePageComponent(
        `../pages/${name}.vue`,
        import.meta.glob('../pages/**/*.vue')
      ),
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props),
      }).use(plugin)
    },
  })
)
```

```typescript [vite.config.ts]
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      /** Main entrypoint */
      input: ['resources/application/main.ts'],
      /** SSR entrypoint (optional) */
      ssr: 'resources/application/ssr.ts',
      refresh: true,
    }),
    vue(),
  ]
})
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/*"]
    }
  },
  "include": ["resources/**/*"],
  "exclude": ["node_modules", "public", "vendor"]
}
```

:::

  </template>
</AdapterWrapper>

<!--@include: ../../../_templates/parts/whats-next.md-->

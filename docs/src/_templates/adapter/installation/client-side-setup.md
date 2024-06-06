<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
const isVue = adapter.name === 'vue'
</script>

# Client-side Setup

> This guide assumes you've already read the [Project Structure Basics](../basics/project-structure).

This document will guide you through the setup of the <a :href="adapter.url">{{ adapter.title }}</a> framework adapter.

## Preperation

1. In the project root, rename `vite.config.js` to `vite.config.ts`.
2. In the project root, create a `tsconfig.json` file.
3. Delete the `resources/js` directory.
4. Create the `resources/application` directory.
5. Create the `resources/pages` directory.

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

## Configuration

### Setup `package.json`

The following `dependencies` should be included in the `package.json` setup.

::: info Server-side Rendering (SSR)
Update the `build` command, to include client-side and server-side bundles (optional).
:::

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```json [package.json]
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build", // [!code --]
    "build": "vite build && vite build --ssr", // [!code ++]
    "preview": "vite preview"
  },
  "devDependencies": {
    "@inertiajs-revamped/preact": "^0.0.6",
    "@types/node": "^20.14.1",
    "@preact/preset-vite": "^2.8.2",
    "axios": "^1.7.2",
    "laravel-vite-plugin": "^1.0.4",
    "preact": "^10.22.0",
    "preact-render-to-string": "^6.5.4",
    "typescript": "^5.4.5",
    "vite": "^5.2.12"
  }
}
```

:::

  </template>
  <template #react>

::: code-group

```json [package.json]
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build", // [!code --]
    "build": "vite build && vite build --ssr", // [!code ++]
    "preview": "vite preview"
  },
  "devDependencies": {
    "@inertiajs-revamped/react": "^0.0.6",
    "@types/node": "^20.14.1",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "axios": "^1.7.2",
    "laravel-vite-plugin": "^1.0.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.4.5",
    "vite": "^5.2.12"
  }
}
```

:::

  </template>
  <template #vue>

::: code-group

```json [package.json]
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build", // [!code --]
    "build": "vite build && vite build --ssr", // [!code ++]
    "preview": "vite preview"
  },
  "devDependencies": {
    "@inertiajs-revamped/vue": "^0.0.7",
    "@types/node": "^20.14.1",
    "@vitejs/plugin-vue": "^5.0.5",
    "@vue/server-renderer": "^3.4.27",
    "axios": "^1.7.2",
    "laravel-vite-plugin": "^1.0.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.4.5",
    "vite": "^5.2.12",
    "vue": "^3.4.27"
  }
}
```

:::

  </template>
</AdapterWrapper>

### Setup `tsconfig.json`

The following `tsconfig.json` setup can be used as a starting point.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

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
    "types": ["node", "vite/client"]
  },
  "include": ["resources/**/*"],
  "exclude": ["public", "node_modules", "vendor"]
}
```

:::

  </template>
  <template #react>

::: code-group

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
    "types": ["node", "vite/client"]
  },
  "include": ["resources/**/*"],
  "exclude": ["public", "node_modules", "vendor"]
}
```

:::

  </template>
  <template #vue>

::: code-group

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
    "types": ["node", "vite/client"]
  },
  "include": ["resources/**/*"],
  "exclude": ["public", "node_modules", "vendor"]
}
```

:::

  </template>
</AdapterWrapper>

### Setup `vite.config.ts`

Add the code below to the `vite.config.ts` to provide a minimum configuration.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

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

:::

  </template>
  <template #react>

::: code-group

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

:::

  </template>
  <template #vue>

::: code-group

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

:::

  </template>
</AdapterWrapper>

### Initialize the main entry

Create `resources/application/main.{{ adapter.name === 'vue' ? 'ts' : 'tsx' }}` and initialize the main entry-point (no SSR).

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [main.tsx]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/preact'
import { createProgress } from '@inertiajs-revamped/preact/progress'
import { render } from 'preact'

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    render(<App {...props} />, el!)
  },
  progress: () =>
    createProgress({
      color: '#4B5563',
    }),
})
```

:::

  </template>
  <template #react>

::: code-group

```tsx [main.tsx]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    createRoot(
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

:::

  </template>
</AdapterWrapper>

## Server-side Rendering (SSR)

### Initialize the SSR entry

Create `resources/application/ssr.{{ adapter.name === 'vue' ? 'ts' : 'tsx' }}` and initialize the server entry-point.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [ssr.tsx]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/preact'
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

:::

  </template>
  <template #react>

::: code-group

```tsx [ssr.tsx]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/react'
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

:::

  </template>
  <template #vue>

::: code-group

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

:::

  </template>
</AdapterWrapper>

<template v-if="adapter.name !== 'vue'">

### Update the client entry

To enable client-side hydration in a {{ adapter.title }} app, update your `main.{{ adapter.name === 'vue' ? 'ts' : 'tsx' }}` file.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [main.tsx]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/preact'
import { createProgress } from '@inertiajs-revamped/preact/progress'
import { render } from 'preact' // [!code --]
import { hydrate } from 'preact' // [!code ++]

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    render(<App {...props} />, el!) // [!code --]
    hydrate(<App {...props} />, el!) // [!code ++]
  },
  progress: () =>
    createProgress({
      color: '#4B5563',
    }),
})
```

:::

  </template>
  <template #react>

::: code-group

```tsx [main.tsx]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // [!code --]
import { hydrateRoot } from 'react-dom/client' // [!code ++]

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    createRoot( // [!code --]
      el!, // [!code --]
      <StrictMode> // [!code --]
        <App {...props} /> // [!code --]
      </StrictMode> // [!code --]
    ) // [!code --]
    hydrateRoot( // [!code ++]
      el!, // [!code ++]
      <StrictMode> // [!code ++]
        <App {...props} /> // [!code ++]
      </StrictMode> // [!code ++]
    ) // [!code ++]
  },
  progress: () =>
    createProgress({
      color: '#4B5563',
    }),
})
```

:::

  </template>
</AdapterWrapper>
</template>

## Start development

### Create a page component

Create the file `resources/pages/index.{{ adapter.componentExt }}` and add the following content:

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [index.tsx]
export default function Index() {
  return <h1>hello world!</h1>
}
```

:::

  </template>
  <template #react>

::: code-group

```tsx [index.tsx]
export default function Index() {
  return <h1>hello world!</h1>
}
```

:::

  </template>
  <template #vue>

::: code-group

```vue [index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

:::

  </template>
</AdapterWrapper>

<CustomBlock type="details">
  Read more about the <a href="../basics/pages">Pages Basics</a>.
</CustomBlock>

### Create a route

When using Inertia, all of your application's routes are defined server-side.
Without the need of creating a `Controller`, add a route to `routes/web.php`.

```php
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia('index');
});
```

### Start the development server

Run the [Vite dev server](https://vitejs.dev/config/server-options.html) with the `dev` command and open the application in your browser.

::: code-group

```shell [npm]
npm run dev
```

```shell [pnpm]
pnpm run dev
```

```shell [yarn]
yarn run dev
```

```shell [bun]
bun run dev
```

:::

```shell
# outputs
VITE v5.2.9  ready in 1487 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

<!--@include: ../../../_templates/parts/whats-next.md-->

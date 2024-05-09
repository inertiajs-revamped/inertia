# Preact Client-side Setup

This document will guide you through the installation of the [Preact](https://preactjs.com/) framework adapter.

> [!INFO] @inertiajs-revamped/preact <Badge type="info" text="v0.0.2" />

## Install Dependencies

Install the Inertia.js-Revamped Preact framework adapter:

::: code-group

```sh [npm]
npm install --save-dev @inertiajs-revamped/preact
```

```sh [pnpm]
pnpm add -D @inertiajs-revamped/preact
```

```sh [yarn]
yarn add -D @inertiajs-revamped/preact
```

```sh [bun]
bun add -D @inertiajs-revamped/preact
```

:::

## Initialize the Revamped app

1. Delete the `resources/js` directory.
2. Create `resources/application/main.tsx` and initialize the main entry-point.
3. (Optional): Create `resources/application/ssr.tsx` and initialize the server entry-point.
4. Create a `vite.config.ts`, install, and configure [Vite](https://vitejs.dev/).
5. (Optional): Create `tsconfig.json`, install, and configure [TypeScript](https://www.typescriptlang.org/).

::: code-group

```ts [main.tsx]
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/preact'
import { createProgress } from '@inertiajs-revamped/preact/progress'
import { hydrate } from 'preact'

createInertiaApp({
  progress: () =>
    createProgress({
      delay: 250,
    }),
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../views/pages/${name}.tsx`,
      import.meta.glob('../views/pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    hydrate(<App {...props} />, el!)
  },
})
```

```ts [ssr.tsx]
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
        `../views/pages/${name}.tsx`,
        import.meta.glob('../views/pages/**/*.tsx')
      ),
    setup: ({ App, props }) => <App {...props} />,
  })
)
```

```ts [vite.config.ts]
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

## What's next?

* To learn about our [project structure](/guide/basics/project-structure) convention, read the basics.

::: tip

<ins>Your contributions are welcome!</ins> Please read our [contributing guide](https://github.com/inertiajs-revamped/inertia/blob/main/CONTRIBUTING.md) for more information.

:::

# Client-side Setup

This document will guide you through the setup of the [Preact](https://preactjs.com/) framework adapter.

<!--@include: ../../../_templates/integrations/installation/client-side-setup.md-->

::: code-group

```ts [main.tsx]
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
      delay: 250,
    }),
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
        `../pages/${name}.tsx`,
        import.meta.glob('../pages/**/*.tsx')
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

<!--@include: ../../../_templates/parts/whats-next.md-->

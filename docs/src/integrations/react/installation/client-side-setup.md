# Client-side Setup

This document will guide you through the setup of the [React](https://react.dev/) framework adapter.

<!--@include: ../../../_templates/integrations/installation/client-side-setup.md-->

::: code-group

```ts [main.tsx]
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
      delay: 250,
    }),
})
```

```ts [ssr.tsx]
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

```ts [vite.config.ts]
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

<!--@include: ../../../_templates/parts/whats-next.md-->

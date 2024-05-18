# Vue Client-side Setup

This document will guide you through the installation of the [Vue](https://vuejs.org/) framework adapter.

> [!INFO] @inertiajs-revamped/vue <Badge type="info" text="v0.0.3" />

## Install Dependencies

Install the Inertia.js-Revamped Vue framework adapter:

::: code-group

```sh [npm]
npm install --save-dev @inertiajs-revamped/vue
```

```sh [pnpm]
pnpm add -D @inertiajs-revamped/vue
```

```sh [yarn]
yarn add -D @inertiajs-revamped/vue
```

```sh [bun]
bun add -D @inertiajs-revamped/vue
```

:::

## Initialize the Revamped app

1. Delete the `resources/js` directory.
2. Create `resources/application/main.ts` and initialize the main entry-point.
3. (Optional): Create `resources/application/ssr.ts` and initialize the server entry-point.
4. Create a `vite.config.ts`, install, and configure [Vite](https://vitejs.dev/).
5. (Optional): Create `tsconfig.json`, install, and configure [TypeScript](https://www.typescriptlang.org/).

::: code-group

```ts [main.ts]
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
      delay: 250,
    }),
})
```

```ts [ssr.ts]
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

```ts [vite.config.ts]
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

## What's next?

* To learn about our [project structure](/guide/basics/project-structure) convention, read the basics.

::: tip

<ins>Your contributions are welcome!</ins> Please read our [contributing guide](https://github.com/inertiajs-revamped/inertia/blob/main/CONTRIBUTING.md) for more information.

:::

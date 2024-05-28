# Client-side Setup

This document will guide you through the setup of the [Vue](https://vuejs.org/) framework adapter.

<!--@include: ../../../_templates/integrations/installation/client-side-setup.md-->

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

<!--@include: ../../../_templates/parts/whats-next.md-->

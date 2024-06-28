import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue'
import { createServer } from '@inertiajs-revamped/vue/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'

createServer((page) =>
  createInertiaApp({
    page,
    title: (title) => `${title} - Vue-E2E`,
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

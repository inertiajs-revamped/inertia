// @ts-nocheck
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue'
import { createServer } from '@inertiajs-revamped/vue/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'

const appName = import.meta.env.VITE_APP_NAME || 'PingCRM'

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `../pages/${name}.vue`,
        import.meta.glob('../pages/**/*.vue')
      ),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
)

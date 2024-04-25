// @ts-nocheck
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue'
import { createApp, h } from 'vue'

import './app.css'

createInertiaApp({
  progress: {
    delay: 250,
  },
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../views/pages/${name}.vue`,
      import.meta.glob('../views/pages/**/*.vue')
    ),
  setup({ el, App, props }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})

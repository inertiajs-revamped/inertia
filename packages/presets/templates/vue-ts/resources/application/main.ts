// @ts-nocheck
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue'
import { createProgress } from '@inertiajs-revamped/vue/progress'
import { createApp, h } from 'vue'

import './app.css'

createInertiaApp({
  progress: () =>
    createProgress({
      delay: 250,
    }),
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../views/pages/${name}.vue`,
      import.meta.glob('../views/pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el!)
  },
})

import {
  Link,
  createInertiaApp,
  resolvePageComponent,
  router,
} from '@inertiajs-revamped/vue'
import { createProgress } from '@inertiajs-revamped/vue/progress'
import { createApp, /* createSSRApp, */ h } from 'vue'

import './app.css'

window.testing = {}
window.testing.Inertia = router

createInertiaApp({
  title: (title) => `${title} - Vue-E2E`,
  page: window.initialPage,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob('../pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    const withPlugin = !window.location.pathname.startsWith('/plugin/without')

    // Required for testing purposes
    props.initialComponent!.inheritAttrs = true

    window.testing.vue = createApp({ render: () => h(App, props) })
      .component('InertiaLink', Link)
      // @ts-expect-error
      .use(withPlugin ? plugin : undefined)
      .mount(el!) /* createSSRApp(App, props)
      .component('InertiaLink', Link)
      .use(withPlugin ? plugin : undefined)
      .mount(el!) */

    /* createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el!) */
  },
  progress: () =>
    createProgress({
      delay: 250,
    }),
})

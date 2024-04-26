// @ts-nocheck
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/preact'
import { createProgress } from '@inertiajs-revamped/preact/progress'
import { hydrate } from 'preact'

import './app.css'

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
    // we are save here
    hydrate(<App {...props} />, el!)
  },
})

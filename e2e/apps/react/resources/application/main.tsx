import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { createRoot } from 'react-dom/client'

import './app.css'

createInertiaApp({
  title: (title) => `${title} - React-E2E`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    createRoot(el!).render(<App {...props} />)
  },
  progress: () =>
    createProgress({
      delay: 250,
    }),
})

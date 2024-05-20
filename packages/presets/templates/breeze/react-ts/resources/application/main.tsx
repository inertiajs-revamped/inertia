// @ts-nocheck
import './bootstrap'
import './css/app.css'

import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { createRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
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
      color: '#4B5563',
    }),
})

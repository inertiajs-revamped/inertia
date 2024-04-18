// @ts-nocheck
import { createInertiaApp } from '@inertiajs-revamped/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react'
import { createRoot /* hydrateRoot */ } from 'react-dom/client'

import './app.css'

createInertiaApp({
  progress: {
    delay: 250,
    color: 'red',
  },
  title: (title) => `${title} - Demo`,
  resolve: (name) =>
    resolvePageComponent(
      `../views/pages/${name}.tsx`,
      import.meta.glob('../views/pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    /* render(<App {...props} />, el) */
    const root = createRoot(el) // createRoot(container!) if you use TypeScript
    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    )
    /* hydrateRoot(el, <App {...props} />) */
  },
})

// @ts-nocheck
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createServer } from '@inertiajs-revamped/react/server'
import { renderToString } from 'react-dom/server'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `../pages/${name}.tsx`,
        import.meta.glob('../pages/**/*.tsx')
      ),
    setup: ({ App, props }) => {
      return <App {...props} />
    },
  })
)

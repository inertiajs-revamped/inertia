import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createServer } from '@inertiajs-revamped/react/server'
import { renderToString } from 'react-dom/server'

export function render() {
  createServer((page) =>
    createInertiaApp({
      page,
      title: (title) => `${title} - React-E2E`,
      render: renderToString,
      resolve: (name) =>
        resolvePageComponent(
          `../pages/${name}.tsx`,
          import.meta.glob('../pages/**/*.tsx')
        ),
      setup: ({ App, props }) => <App {...props} />,
    })
  )
}

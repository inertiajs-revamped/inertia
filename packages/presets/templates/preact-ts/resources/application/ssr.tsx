// @ts-nocheck
import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/preact'
import createServer from '@inertiajs-revamped/preact/server'
import renderToString from 'preact-render-to-string'

createServer((page) =>
  createInertiaApp({
    page,
    title: (title) => `${title} - Starter kit`,
    render: renderToString,
    resolve: (name) =>
      resolvePageComponent(
        `../views/pages/${name}.tsx`,
        import.meta.glob('../views/pages/**/*.tsx')
      ),
    setup: ({ App, props }) => <App {...props} />,
  })
)

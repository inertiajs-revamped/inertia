import {
  createInertiaApp,
  resolvePageComponent,
} from '@inertiajs-revamped/react'
import { createProgress } from '@inertiajs-revamped/react/progress'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import './app.css'

createInertiaApp({
  title: (title) => `${title} - Starter kit`,
  resolve: (name) =>
    resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    createRoot(el!).render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    )
  },
  progress: () =>
    createProgress({
      delay: 250,
    }),
})

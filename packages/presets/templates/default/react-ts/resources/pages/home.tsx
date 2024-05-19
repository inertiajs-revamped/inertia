// @ts-nocheck
import { Head, type HomePageProps, withLayout } from '@inertiajs-revamped/react'

import Layout from '@/layouts/default'

const Home = ({ versions }: HomePageProps) => {
  return (
    <>
      <Head title="Home" />
      <h1>Quick start</h1>
      <p>
        Welcome to the{' '}
        <a
          href="https://inertiajs-revamped.com/"
          target="_blank"
          rel="noreferrer"
        >
          Inertia.js-Revamped
        </a>
        /
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
          React
        </a>{' '}
        starter kit, with Laravel <code>{versions.laravel}</code> & PHP{' '}
        <code>{versions.php}</code>!
      </p>

      <h2>Conventions</h2>
      <p>
        The project follows the convention below for a consistent and organized
        architecture.
      </p>

      <h3>Directories & Files</h3>
      <ul>
        <li>
          File and directory names use <code>kebab-case</code> instead of{' '}
          <code>StudlyCase</code>
        </li>
        <li>
          Root blade template is stored in{' '}
          <code>resources/views/app.blade.php</code>
        </li>
        <li>
          Main entry point is <code>resources/application/main.tsx</code>
        </li>
        <li>
          SSR entry point is <code>resources/application/ssr.tsx</code>
        </li>
      </ul>

      <h3>Pages & Layouts</h3>
      <ul>
        <li>
          Pages are stored in <code>resources/pages</code>
        </li>
        <li>
          Components are stored in <code>resources/components</code>
        </li>
        <li>
          Layouts are placed in the folder <code>resources/layouts</code>
        </li>
      </ul>

      <h3>Typings</h3>
      <p>
        Default types can be found and extended in{' '}
        <code>resources/types/inertia-react.d.ts</code>
      </p>

      <h3>Routes</h3>
      <p>
        Default routes can be modified in <code>routes/web.php</code>
      </p>

      <h3>Shared props</h3>
      <p>
        Default shared props can be modified in{' '}
        <code>app/Http/Middleware/HandleInertiaRequests.php</code>
      </p>

      <h3>Server-side rendering (SSR)</h3>
      <p>
        Enabled by default, can be modified in <code>config/inertia.php</code>
      </p>
    </>
  )
}

Home.layout = withLayout(Layout)

export default Home

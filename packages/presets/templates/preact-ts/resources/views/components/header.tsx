// @ts-nocheck
import { Link } from '@inertiajs-revamped/preact'

export default function Header() {
  return (
    <header>
      <nav className="container">
        <h2>
          <Link href="/">Preact App</Link>
        </h2>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/example">Example</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

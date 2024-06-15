import { Link, type Method } from '@inertiajs-revamped/react'

export default function ({ method }: { method: Method }) {
  return (
    <>
      <span className="text">
        This is the links page that demonstrates inertia-links without the 'as'
        warning
      </span>

      <Link method={method} href="/example" className="get" as="button">
        {method} button Link
      </Link>
    </>
  )
}

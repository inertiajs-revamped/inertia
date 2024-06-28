import { Link, type Method } from '@inertiajs-revamped/react'

export default function ({ method }: { method: Method }) {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates inertia-links with an 'as'
        warning
      </span>

      <Link method={method} href="/example" id="get">
        {method} Link
      </Link>
    </>
  )
}

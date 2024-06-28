import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates passing custom headers
      </span>

      <Link href="/dump/get" id="default">
        Standard visit Link
      </Link>

      <Link
        method={'get'}
        href="/dump/get"
        headers={{ foo: 'bar' }}
        id="custom"
      >
        GET Link
      </Link>
      <Link
        as="button"
        method={'post'}
        href="/dump/post"
        headers={{ bar: 'baz', 'X-Requested-With': 'custom' }}
        id="overridden"
      >
        POST Link
      </Link>
    </>
  )
}

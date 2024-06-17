import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span className="text">
        This is the links page that demonstrates Link methods
      </span>

      <Link method={'get'} href="/dump/get" className="get">
        GET Link
      </Link>
      <Link as="button" method={'post'} href="/dump/post" className="post">
        POST Link
      </Link>
      <Link as="button" method={'put'} href="/dump/put" className="put">
        PUT Link
      </Link>
      <Link as="button" method={'patch'} href="/dump/patch" className="patch">
        PATCH Link
      </Link>
      <Link
        as="button"
        method={'delete'}
        href="/dump/delete"
        className="delete"
      >
        DELETE Link
      </Link>
    </>
  )
}

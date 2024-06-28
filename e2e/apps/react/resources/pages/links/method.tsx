import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates inertia-link methods
      </span>

      <Link method={'get'} href="/dump/get" id="get">
        GET Link
      </Link>
      <Link as="button" method={'post'} href="/dump/post" id="post">
        POST Link
      </Link>
      <Link as="button" method={'put'} href="/dump/put" id="put">
        PUT Link
      </Link>
      <Link as="button" method={'patch'} href="/dump/patch" id="patch">
        PATCH Link
      </Link>
      <Link as="button" method={'delete'} href="/dump/delete" id="delete">
        DELETE Link
      </Link>
    </>
  )
}

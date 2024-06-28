import { Link } from '@inertiajs-revamped/react'

export default function () {
  const data = {
    file: new File([], 'example.jpg'),
    foo: 'bar',
  }

  return (
    <>
      <span id="text">
        This is the links page that demonstrates the automatic conversion of
        plain objects to form-data
      </span>

      <Link method={'get'} href="/dump/get" data={data} id="get">
        GET Link
      </Link>
      <Link as="button" method={'post'} href="/dump/post" data={data} id="post">
        POST Link
      </Link>
      <Link as="button" method={'put'} href="/dump/put" data={data} id="put">
        PUT Link
      </Link>
      <Link
        as="button"
        method={'patch'}
        href="/dump/patch"
        data={data}
        id="patch"
      >
        PATCH Link
      </Link>
      <Link
        as="button"
        method={'delete'}
        href="/dump/delete"
        data={data}
        id="delete"
      >
        DELETE Link
      </Link>
    </>
  )
}

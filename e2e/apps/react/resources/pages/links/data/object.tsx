import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates passing data through plain
        objects
      </span>

      <Link method={'get'} href="/dump/get" data={{ foo: 'get' }} id="get">
        GET Link
      </Link>
      <Link
        as="button"
        method={'post'}
        href="/dump/post"
        data={{ bar: 'post' }}
        id="post"
      >
        POST Link
      </Link>
      <Link
        as="button"
        method={'put'}
        href="/dump/put"
        data={{ baz: 'put' }}
        id="put"
      >
        PUT Link
      </Link>
      <Link
        as="button"
        method={'patch'}
        href="/dump/patch"
        data={{ foo: 'patch' }}
        id="patch"
      >
        PATCH Link
      </Link>
      <Link
        as="button"
        method={'delete'}
        href="/dump/delete"
        data={{ bar: 'delete' }}
        id="delete"
      >
        DELETE Link
      </Link>

      <Link href="/dump/get" data={{ a: ['b', 'c'] }} id="qsaf-default">
        QSAF Defaults
      </Link>
      <Link
        href="/dump/get"
        data={{ a: ['b', 'c'] }}
        queryStringArrayFormat="indices"
        id="qsaf-indices"
      >
        QSAF Indices
      </Link>
      <Link
        href="/dump/get"
        data={{ a: ['b', 'c'] }}
        queryStringArrayFormat="brackets"
        id="qsaf-brackets"
      >
        QSAF Brackets
      </Link>
    </>
  )
}

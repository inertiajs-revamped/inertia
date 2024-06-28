import { Link } from '@inertiajs-revamped/react'

interface PartialReloadsProps {
  foo: number
  bar: number
  baz: number
  headers: any
}

export default function ({ foo = 0, bar, baz, headers }: PartialReloadsProps) {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates partial reloads
      </span>
      <span id="foo-text">Foo is now {foo}</span>
      <span id="bar-text">Bar is now {bar}</span>
      <span id="baz-text">Baz is now {baz}</span>
      <pre id="headers" data-page={JSON.stringify(headers, null)}>
        {JSON.stringify(headers, null, 2)}
      </pre>

      <Link href="/links/partial-reloads" data={{ foo }} id="all">
        Update All
      </Link>
      <Link
        href="/links/partial-reloads"
        only={['headers', 'foo', 'bar']}
        data={{ foo }}
        id="foo-bar"
      >
        'Only' foo + bar
      </Link>
      <Link
        href="/links/partial-reloads"
        only={['headers', 'baz']}
        data={{ foo }}
        id="baz"
      >
        'Only' baz
      </Link>
      <Link
        href="/links/partial-reloads"
        except={['foo', 'bar']}
        data={{ foo }}
        id="except-foo-bar"
      >
        'Except' foo + bar
      </Link>
      <Link
        href="/links/partial-reloads"
        except={['baz']}
        data={{ foo }}
        id="except-baz"
      >
        'Except' baz
      </Link>
    </>
  )
}

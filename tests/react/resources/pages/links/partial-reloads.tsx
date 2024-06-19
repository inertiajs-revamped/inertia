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
      <span className="text">
        This is the links page that demonstrates partial reloads
      </span>
      <span className="foo-text">Foo is now {foo}</span>
      <span className="bar-text">Bar is now {bar}</span>
      <span className="baz-text">Baz is now {baz}</span>
      <pre className="headers" data-page={JSON.stringify(headers, null)}>
        {JSON.stringify(headers, null, 2)}
      </pre>

      <Link href="/links/partial-reloads" data={{ foo }} className="all">
        Update All
      </Link>
      <Link
        href="/links/partial-reloads"
        only={['headers', 'foo', 'bar']}
        data={{ foo }}
        className="foo-bar"
      >
        'Only' foo + bar
      </Link>
      <Link
        href="/links/partial-reloads"
        only={['headers', 'baz']}
        data={{ foo }}
        className="baz"
      >
        'Only' baz
      </Link>
      <Link
        href="/links/partial-reloads"
        except={['foo', 'bar']}
        data={{ foo }}
        className="except-foo-bar"
      >
        'Except' foo + bar
      </Link>
      <Link
        href="/links/partial-reloads"
        except={['baz']}
        data={{ foo }}
        className="except-baz"
      >
        'Except' baz
      </Link>
    </>
  )
}

import { router } from '@inertiajs-revamped/react'

interface PartialReloadsProps {
  foo: number
  bar: number
  baz: number
  headers: any
}

export default function ({ foo = 0, bar, baz, headers }: PartialReloadsProps) {
  const partialReloadVisit = () => {
    router.visit('/visits/partial-reloads', {
      data: { foo },
    })
  }

  const partialReloadVisitFooBar = () => {
    router.visit('/visits/partial-reloads', {
      data: { foo },
      only: ['headers', 'foo', 'bar'],
    })
  }

  const partialReloadVisitBaz = () => {
    router.visit('/visits/partial-reloads', {
      data: { foo },
      only: ['headers', 'baz'],
    })
  }

  const partialReloadVisitExceptFooBar = () => {
    router.visit('/visits/partial-reloads', {
      data: { foo },
      except: ['foo', 'bar'],
    })
  }

  const partialReloadVisitExceptBaz = () => {
    router.visit('/visits/partial-reloads', {
      data: { foo },
      except: ['baz'],
    })
  }

  const partialReloadGet = () => {
    router.get('/visits/partial-reloads', {
      foo,
    })
  }

  const partialReloadGetFooBar = () => {
    router.get(
      '/visits/partial-reloads',
      {
        foo,
      },
      {
        only: ['headers', 'foo', 'bar'],
      }
    )
  }

  const partialReloadGetBaz = () => {
    router.get(
      '/visits/partial-reloads',
      {
        foo,
      },
      {
        only: ['headers', 'baz'],
      }
    )
  }

  const partialReloadGetExceptFooBar = () => {
    router.get(
      '/visits/partial-reloads',
      {
        foo,
      },
      {
        except: ['foo', 'bar'],
      }
    )
  }

  const partialReloadGetExceptBaz = () => {
    router.get(
      '/visits/partial-reloads',
      {
        foo,
      },
      {
        except: ['baz'],
      }
    )
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates partial reloads using manual visits
      </span>
      <span id="foo-text">Foo is now {foo}</span>
      <span id="bar-text">Bar is now {bar}</span>
      <span id="baz-text">Baz is now {baz}</span>
      <pre id="headers" data-page={JSON.stringify(headers, null)}>
        {JSON.stringify(headers, null, 2)}
      </pre>

      <span onClick={partialReloadVisit} id="visit">
        Update All (visit)
      </span>
      <span onClick={partialReloadVisitFooBar} id="visit-foo-bar">
        'Only' foo + bar (visit)
      </span>
      <span onClick={partialReloadVisitBaz} id="visit-baz">
        'Only' baz (visit)
      </span>
      <span onClick={partialReloadVisitExceptFooBar} id="visit-except-foo-bar">
        'Except' foo + bar (visit)
      </span>
      <span onClick={partialReloadVisitExceptBaz} id="visit-except-baz">
        'Except' baz (visit)
      </span>

      <span onClick={partialReloadGet} id="get">
        Update All (GET)
      </span>
      <span onClick={partialReloadGetFooBar} id="get-foo-bar">
        'Only' foo + bar (GET)
      </span>
      <span onClick={partialReloadGetBaz} id="get-baz">
        'Only' baz (GET)
      </span>
      <span onClick={partialReloadGetExceptFooBar} id="get-except-foo-bar">
        'Except' foo + bar (GET)
      </span>
      <span onClick={partialReloadGetExceptBaz} id="get-except-baz">
        'Except' baz (GET)
      </span>
    </>
  )
}

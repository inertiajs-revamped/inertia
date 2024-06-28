import { router } from '@inertiajs-revamped/react'

export default function ({ foo = 'default' }) {
  const preserve = () => {
    router.visit('/visits/preserve-state-page-two', {
      data: { foo: 'bar' },
      preserveState: true,
    })
  }

  const preserveFalse = () => {
    router.visit('/visits/preserve-state-page-two', {
      data: { foo: 'baz' },
      preserveState: false,
    })
  }

  const preserveCallback = () => {
    router.get(
      '/visits/preserve-state-page-two',
      {
        foo: 'callback-bar',
      },
      {
        preserveState: (page) => {
          alert(page)

          return true
        },
      }
    )
  }

  const preserveCallbackFalse = () => {
    router.get(
      '/visits/preserve-state-page-two',
      {
        foo: 'callback-baz',
      },
      {
        preserveState: (page) => {
          alert(page)

          return false
        },
      }
    )
  }

  const preserveGet = () => {
    router.get(
      '/visits/preserve-state-page-two',
      {
        foo: 'get-bar',
      },
      {
        preserveState: true,
      }
    )
  }

  const preserveGetFalse = () => {
    router.get(
      '/visits/preserve-state-page-two',
      {
        foo: 'get-baz',
      },
      {
        preserveState: false,
      }
    )
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates preserve state on manual visits
      </span>
      <span id="foo">Foo is now {foo}</span>
      <label>
        Example Field
        <input type="text" name="example-field" id="field" />
      </label>

      <span onClick={preserve} id="preserve">
        [State] Preserve visit: true
      </span>
      <span onClick={preserveFalse} id="preserve-false">
        [State] Preserve visit: false
      </span>
      <span onClick={preserveCallback} id="preserve-callback">
        [State] Preserve Callback: true
      </span>
      <span onClick={preserveCallbackFalse} id="preserve-callback-false">
        [State] Preserve Callback: false
      </span>
      <span onClick={preserveGet} id="preserve-get">
        [State] Preserve GET: true
      </span>
      <span onClick={preserveGetFalse} id="preserve-get-false">
        [State] Preserve GET: false
      </span>
    </>
  )
}

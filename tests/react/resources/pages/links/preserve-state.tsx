import { Link, type Page } from '@inertiajs-revamped/react'

export default function ({ foo = 'default' }) {
  const preserveCallback = (page: Page) => {
    alert(page)
    return true
  }

  const preserveCallbackFalse = (page: Page) => {
    alert(page)
    return false
  }
  return (
    <>
      <span className="text">
        This is the links page that demonstrates preserve state on Links
      </span>
      <span className="foo">Foo is now {foo}</span>
      <label>
        Example Field
        <input type="text" name="example-field" className="field" />
      </label>

      <Link
        className="preserve"
        href="/links/preserve-state-page-two"
        data={{ foo: 'bar' }}
        preserveState
      >
        [State] Preserve: true
      </Link>
      <Link
        className="preserve-false"
        href="/links/preserve-state-page-two"
        data={{ foo: 'baz' }}
        preserveState={false}
      >
        [State] Preserve: false
      </Link>

      <Link
        className="preserve-callback"
        href="/links/preserve-state-page-two"
        data={{ foo: 'callback-bar' }}
        preserveState={preserveCallback}
      >
        [State] Preserve Callback: true
      </Link>
      <Link
        className="preserve-callback-false"
        href="/links/preserve-state-page-two"
        data={{ foo: 'callback-baz' }}
        preserveState={preserveCallbackFalse}
      >
        [State] Preserve Callback: false
      </Link>
    </>
  )
}

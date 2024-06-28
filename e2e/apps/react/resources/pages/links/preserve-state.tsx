import { Link, type Page } from '@inertiajs-revamped/react'
import { useState } from 'react'

export default function ({ foo = 'default' }) {
  const [fieldValue, setFieldValue] = useState('')

  const preserveCallback = (page: Page) => {
    alert(JSON.stringify(page, null, 2))
    return true
  }

  const preserveCallbackFalse = (page: Page) => {
    alert(JSON.stringify(page, null, 2))
    return false
  }

  return (
    <>
      <span id="text">
        This is the links page that demonstrates preserve state on Links
      </span>
      <span id="foo">Foo is now {foo}</span>
      <label>
        Example Field
        <input
          type="text"
          name="field"
          id="field"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      </label>

      <Link
        id="preserve"
        href="/links/preserve-state-page-two"
        data={{ foo: 'bar' }}
        preserveState
      >
        [State] Preserve: true
      </Link>
      <Link
        id="preserve-false"
        href="/links/preserve-state-page-two"
        data={{ foo: 'baz' }}
        preserveState={false}
      >
        [State] Preserve: false
      </Link>

      <Link
        id="preserve-callback"
        href="/links/preserve-state-page-two"
        data={{ foo: 'callback-bar' }}
        preserveState={preserveCallback}
      >
        [State] Preserve Callback: true
      </Link>
      <Link
        id="preserve-callback-false"
        href="/links/preserve-state-page-two"
        data={{ foo: 'callback-baz' }}
        preserveState={preserveCallbackFalse}
      >
        [State] Preserve Callback: false
      </Link>
    </>
  )
}

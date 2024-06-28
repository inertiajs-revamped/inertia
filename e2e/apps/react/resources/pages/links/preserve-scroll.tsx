import { Link, type Page, withLayout } from '@inertiajs-revamped/react'
import WithScrollRegion from '../../layouts/with-scroll-region'

function PreserveScrollPage({ foo = 'default' }) {
  const preserveCallback = (page: Page) => {
    alert(JSON.stringify(page, null, 2))
    return true
  }

  const preserveCallbackFalse = (page: Page) => {
    alert(JSON.stringify(page, null, 2))
    return false
  }
  return (
    <div style={{ height: '800px', width: '600px' }}>
      <span id="text">
        This is the links page that demonstrates scroll preservation with scroll
        regions
      </span>
      <span id="foo">Foo is now {foo}</span>

      <Link
        href="/links/preserve-scroll-page-two"
        id="preserve"
        data={{ foo: 'baz' }}
        preserveScroll
      >
        Preserve Scroll
      </Link>
      <Link
        href="/links/preserve-scroll-page-two"
        id="reset"
        data={{ foo: 'bar' }}
      >
        Reset Scroll
      </Link>

      <Link
        href="/links/preserve-scroll-page-two"
        id="preserve-callback"
        data={{ foo: 'baz' }}
        preserveScroll={preserveCallback}
      >
        Preserve Scroll (Callback)
      </Link>
      <Link
        href="/links/preserve-scroll-page-two"
        id="reset-callback"
        data={{ foo: 'foo' }}
        preserveScroll={preserveCallbackFalse}
      >
        Reset Scroll (Callback)
      </Link>

      <a href="/non-inertia" id="off-site">
        Off-site link
      </a>
    </div>
  )
}

PreserveScrollPage.layout = withLayout(WithScrollRegion)

export default PreserveScrollPage

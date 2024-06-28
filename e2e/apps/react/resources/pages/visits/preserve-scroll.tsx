import { router, withLayout } from '@inertiajs-revamped/react'
import WithScrollRegion from '../../layouts/with-scroll-region'

function PreserveScrollPage({ foo = 'default' }) {
  const preserve = () => {
    router.visit('/visits/preserve-scroll-page-two', {
      data: { foo: 'foo' },
      preserveScroll: true,
    })
  }

  const preserveFalse = () => {
    router.visit('/visits/preserve-scroll-page-two', {
      data: { foo: 'bar' },
    })
  }

  const preserveCallback = () => {
    router.visit('/visits/preserve-scroll-page-two', {
      data: { foo: 'baz' },
      preserveScroll: (page) => {
        alert(JSON.stringify(page, null, 2))

        return true
      },
    })
  }

  const preserveCallbackFalse = () => {
    router.visit('/visits/preserve-scroll-page-two', {
      data: { foo: 'foo' },
      preserveScroll: (page) => {
        alert(JSON.stringify(page, null, 2))

        return false
      },
    })
  }

  const preserveGet = () => {
    router.get(
      '/visits/preserve-scroll-page-two',
      {
        foo: 'bar',
      },
      {
        preserveScroll: true,
      }
    )
  }

  const preserveGetFalse = () => {
    router.get('/visits/preserve-scroll-page-two', {
      foo: 'baz',
    })
  }

  return (
    <div style={{ height: '800px', width: '600px' }}>
      <span id="text">
        This is the page that demonstrates scroll preservation with scroll
        regions when using manual visits
      </span>
      <span id="foo">Foo is now {foo}</span>

      <span onClick={preserve} id="preserve">
        Preserve Scroll
      </span>
      <span onClick={preserveFalse} id="reset">
        Reset Scroll
      </span>
      <span onClick={preserveCallback} id="preserve-callback">
        Preserve Scroll (Callback)
      </span>
      <span onClick={preserveCallbackFalse} id="reset-callback">
        Reset Scroll (Callback)
      </span>
      <span onClick={preserveGet} id="preserve-get">
        Preserve Scroll (GET)
      </span>
      <span onClick={preserveGetFalse} id="reset-get">
        Reset Scroll (GET)
      </span>

      <a href="/non-inertia" id="off-site">
        Off-site link
      </a>
    </div>
  )
}

PreserveScrollPage.layout = withLayout(WithScrollRegion)

export default PreserveScrollPage

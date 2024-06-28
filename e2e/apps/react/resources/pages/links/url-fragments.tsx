import { Link } from '@inertiajs-revamped/react'
import { useEffect, useState } from 'react'

export default function () {
  const [scroll, setScroll] = useState({
    documentScrollTop: 0,
    documentScrollLeft: 0,
  })

  const handleScrollEvent = () => {
    setScroll({
      ...scroll,
      documentScrollTop: document.documentElement.scrollTop,
      documentScrollLeft: document.documentElement.scrollLeft,
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEvent)
    return () => document.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <>
      <span id="text">
        This is the links page that demonstrates url fragment behaviour
      </span>

      <div style={{ width: '200vw', height: '200vh', marginTop: '50vh' }}>
        <Link href="/links/url-fragments#target" id="basic">
          Basic link
        </Link>
        <Link href="#target" id="fragment">
          Fragment link
        </Link>
        <Link
          href="/links/url-fragments#non-existent-fragment"
          id="non-existent-fragment"
        >
          Non-existent fragment link
        </Link>

        <div id="target">This is the element with id 'target'</div>

        <div id="document-position">
          Document scroll position is {scroll.documentScrollLeft} &{' '}
          {scroll.documentScrollTop}
        </div>
      </div>
    </>
  )
}

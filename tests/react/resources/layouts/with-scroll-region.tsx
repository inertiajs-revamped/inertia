import type { LayoutProps } from '@inertiajs-revamped/react'
import { useEffect, useState } from 'react'

export default function ({ children }: LayoutProps) {
  const [scroll, setScroll] = useState({
    documentScrollTop: 0,
    documentScrollLeft: 0,
    slotScrollTop: 0,
    slotScrollLeft: 0,
  })

  const handleScrollEvent = () => {
    setScroll({
      documentScrollTop: document.documentElement.scrollTop,
      documentScrollLeft: document.documentElement.scrollLeft,
      slotScrollTop: document.getElementById('slot')!.scrollTop,
      slotScrollLeft: document.getElementById('slot')!.scrollLeft,
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEvent)
    return () => document.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <div style={{ width: '200vw' }}>
      <span className="layout-text">With scroll regions</span>
      <div className="document-position">
        Document scroll position is {scroll.documentScrollLeft} &{' '}
        {scroll.documentScrollTop}
      </div>
      <div style={{ height: '200vh' }}>
        <span className="slot-position">
          Slot scroll position is {scroll.slotScrollLeft} &{' '}
          {scroll.slotScrollTop}
        </span>
        <div
          scroll-region
          id="slot"
          style={{ height: '100px', width: '500px', overflow: 'scroll' }}
          onScroll={handleScrollEvent}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

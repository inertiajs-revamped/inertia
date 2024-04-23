import { createHeadManager, router } from '@inertiajs-revamped/core'
import { createElement, useEffect, useMemo, useState } from 'react'
import HeadContext from './HeadContext'
import PageContext from './PageContext'

export default function App({
  // @ts-expect-error
  children,
  // @ts-expect-error
  initialPage,
  // @ts-expect-error
  initialComponent,
  // @ts-expect-error
  resolveComponent,
  // @ts-expect-error
  titleCallback,
  // @ts-expect-error
  onHeadUpdate,
}) {
  const [current, setCurrent] = useState({
    component: initialComponent || null,
    page: initialPage,
    key: -1,
  })

  const headManager = useMemo(() => {
    return createHeadManager(
      typeof window === 'undefined',
      titleCallback || ((title) => title),
      onHeadUpdate || (() => {})
    )
  }, [])

  useEffect(() => {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page, preserveState }) => {
        setCurrent((current) => ({
          component,
          page,
          key: preserveState ? current.key : Date.now(),
        }))
      },
    })

    router.on('navigate', () => headManager.forceUpdate())
  }, [])

  if (!current.component) {
    return createElement(
      HeadContext.Provider,
      { value: headManager },
      createElement(PageContext.Provider, { value: current.page }, null)
    )
  }

  const renderChildren =
    children ||
    // @ts-expect-error
    (({ Component, props, key }) => {
      const child = createElement(Component, { key, ...props })

      if (typeof Component.layout === 'function') {
        return Component.layout(child)
      }

      if (Array.isArray(Component.layout)) {
        return (
          Component.layout
            .concat(child)
            .reverse()
            // @ts-expect-error
            .reduce((children, Layout) =>
              createElement(Layout, { children, ...props })
            )
        )
      }

      return child
    })

  return createElement(
    HeadContext.Provider,
    { value: headManager },
    createElement(
      PageContext.Provider,
      { value: current.page },
      renderChildren({
        Component: current.component,
        key: current.key,
        props: current.page.props,
      })
    )
  )
}

App.displayName = 'Inertia'

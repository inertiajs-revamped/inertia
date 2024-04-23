import {
  type Page,
  type PageProps,
  createHeadManager,
  router,
} from '@inertiajs-revamped/core'
import { type ComponentChildren, type Key, h } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import HeadContext from './HeadContext'
import PageContext from './PageContext'
import type { InertiaComponentType, SetupOptions } from './createInertiaApp'

export default function App<SharedProps extends PageProps = PageProps>({
  children,
  initialPage,
  initialComponent,
  resolveComponent,
  titleCallback,
  onHeadUpdate,
}: {
  children?: (props: {
    Component: SetupOptions<SharedProps>['props']['initialComponent']
    props: Page<SharedProps>['props']
    key: Key
  }) => ComponentChildren
} & SetupOptions<SharedProps>['props']) {
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
          component: component as InertiaComponentType,
          page,
          key: preserveState ? current.key : Date.now(),
        }))
      },
    })

    router.on('navigate', () => headManager.forceUpdate())
  }, [])

  if (!current.component) {
    return h(
      HeadContext.Provider,
      { value: headManager },
      h(PageContext.Provider, { value: current.page }, null)
    )
  }

  const renderChildren =
    children ||
    (({ Component, props, key }) => {
      const child = h(Component, { key, ...props })

      if (typeof Component.layout === 'function') {
        return Component.layout(child)
      }

      if (Array.isArray(Component.layout)) {
        return (
          Component.layout
            .concat(child)
            .reverse()
            // @ts-expect-error
            .reduce((children, Layout) => h(Layout, { children, ...props }))
        )
      }

      return child
    })

  return h(
    HeadContext.Provider,
    { value: headManager },
    h(
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

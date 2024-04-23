import {
  type HeadManager,
  type Page,
  type PageProps,
  createHeadManager,
  router,
} from '@inertiajs-revamped/core'
import {
  type FunctionComponentElement,
  type Key,
  type ProviderProps,
  type ReactNode,
  createElement,
  useEffect,
  useMemo,
  useState,
} from 'react'
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
  }) => ReactNode
} & SetupOptions<SharedProps>['props']): FunctionComponentElement<
  ProviderProps<HeadManager | null>
> {
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
    return createElement(
      HeadContext.Provider,
      { value: headManager },
      createElement(PageContext.Provider, { value: current.page }, null)
    )
  }

  const renderChildren =
    children ||
    (({ Component, props, key }) => {
      const child = createElement(Component, { key, ...props })

      if (typeof Component.layout === 'function') {
        return Component.layout(child)
      }

      /**
       * This needs refactoring, because of new `withLayout` feature.
       *
       * Somehow React picks up the wrong `createElement` overload when `createElement` is executed inside `reduce`.
       * But maybe it is because of a wrong overload here or in `createInertiaApp`.
       *
       * Usage in Component: `ExampleComponent.layout = [LayoutOne, LayoutTwo, LayoutThree]`
       */
      if (Array.isArray(Component.layout)) {
        return Component.layout
          .concat(child)
          .reverse()
          .reduce((children, Layout) =>
            // @ts-expect-error
            createElement(Layout, { children, ...props })
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

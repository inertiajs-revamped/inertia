import {
  type HeadManagerOnUpdate,
  type HeadManagerTitleCallback,
  type Page,
  type PageProps,
  type PageResolver,
  setupProgress,
} from '@inertiajs-revamped/core'
import {
  type ComponentType,
  type FunctionComponent,
  type Key,
  type ReactElement,
  type ReactNode,
  createElement,
} from 'react'
import type { renderToString } from 'react-dom/server'
import App from './App'

export type AppType<SharedProps extends PageProps = PageProps> =
  FunctionComponent<
    {
      children?: (props: {
        Component: ComponentType
        key: Key
        props: Page<SharedProps>['props']
      }) => ReactNode
    } & SetupOptions<unknown, SharedProps>['props']
  >

export type SetupOptions<ElementType, SharedProps extends PageProps> = {
  el: ElementType
  App: AppType
  props: {
    initialPage: Page<SharedProps>
    initialComponent: ReactNode
    resolveComponent: PageResolver
    titleCallback?: HeadManagerTitleCallback
    onHeadUpdate?: HeadManagerOnUpdate
  }
}

export type BaseInertiaAppOptions = {
  title?: HeadManagerTitleCallback
  resolve: PageResolver
}

export type CreateInertiaAppSetupReturnType = ReactElement | void
export type InertiaAppOptionsForCSR<SharedProps extends PageProps> =
  BaseInertiaAppOptions & {
    id?: string
    page?: Page | string
    render?: undefined
    progress?:
      | false
      | {
          delay?: number
          color?: string
          includeCSS?: boolean
          showSpinner?: boolean
        }
    setup(
      options: SetupOptions<HTMLElement, SharedProps>
    ): CreateInertiaAppSetupReturnType
  }

export type CreateInertiaAppSSRContent = { head: string[]; body: string }
export type InertiaAppOptionsForSSR<SharedProps extends PageProps> =
  BaseInertiaAppOptions & {
    id?: undefined
    page: Page | string
    render: typeof renderToString
    progress?: undefined
    setup(options: SetupOptions<null, SharedProps>): ReactElement
  }

export default async function createInertiaApp<
  SharedProps extends PageProps = PageProps,
>(
  options: InertiaAppOptionsForCSR<SharedProps>
): Promise<CreateInertiaAppSetupReturnType>
export default async function createInertiaApp<
  SharedProps extends PageProps = PageProps,
>(
  options: InertiaAppOptionsForSSR<SharedProps>
): Promise<CreateInertiaAppSSRContent>
export default async function createInertiaApp<
  SharedProps extends PageProps = PageProps,
>({
  id = 'app',
  resolve,
  setup,
  title,
  progress = {},
  page,
  render,
}:
  | InertiaAppOptionsForCSR<SharedProps>
  | InertiaAppOptionsForSSR<SharedProps>): Promise<
  CreateInertiaAppSetupReturnType | CreateInertiaAppSSRContent
> {
  const isServer = typeof window === 'undefined'
  const el = isServer ? null : document.getElementById(id)
  // @ts-expect-error
  const initialPage = page || JSON.parse(el.dataset.page)

  const resolveComponent = (name: string) =>
    // @ts-expect-error
    Promise.resolve(resolve(name)).then((module) => module.default || module)

  let head: string[] = []

  const reactApp = await resolveComponent(initialPage.component).then(
    (initialComponent) => {
      return setup({
        // @ts-expect-error
        el,
        // @ts-expect-error
        App,
        // @ts-expect-error
        props: {
          initialPage,
          initialComponent,
          resolveComponent,
          titleCallback: title,
          onHeadUpdate: isServer
            ? (elements: string[]) => (head = elements)
            : null,
        },
      })
    }
  )

  if (!isServer && progress) {
    setupProgress(progress)
  }

  if (isServer && render) {
    // close to despair
    const body = await render(
      createElement(
        'div',
        {
          id,
          'data-page': JSON.stringify(initialPage),
        },
        // @ts-expect-error
        reactApp
      )
    )

    return { head, body }
  }
}

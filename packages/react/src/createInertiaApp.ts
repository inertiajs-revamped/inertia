import type {
  HeadManagerOnUpdate,
  HeadManagerTitleCallback,
  Page,
  PageProps,
  PageResolver,
  ProgressCallback,
} from '@inertiajs-revamped/core'
import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  createElement,
} from 'react'
import App from './App'

export type InertiaComponentType<P = {}> = ComponentType<P> & {
  layout?: ((page: ReactElement) => ReactNode) | Array<ReactNode>
}

export type SetupOptions<SharedProps extends PageProps> = {
  el: HTMLElement | null
  App: typeof App
  props: {
    initialPage: Page<SharedProps>
    initialComponent: InertiaComponentType<any>
    resolveComponent: PageResolver<InertiaComponentType<any>>
    titleCallback?: HeadManagerTitleCallback | undefined
    onHeadUpdate?: HeadManagerOnUpdate | null
  }
}

type BaseInertiaAppOptions = {
  title?: HeadManagerTitleCallback
  resolve: PageResolver<InertiaComponentType<any>>
}

type CreateInertiaAppSetupReturnType = ReactElement | void
type InertiaAppOptionsForCSR<SharedProps extends PageProps> =
  BaseInertiaAppOptions & {
    id?: string
    page?: Page | string
    render?: undefined
    progress?: ProgressCallback
    setup(options: SetupOptions<SharedProps>): CreateInertiaAppSetupReturnType
  }

type CreateInertiaAppSSRContent = { head: string[]; body: string }
type InertiaAppOptionsForSSR<SharedProps extends PageProps> =
  BaseInertiaAppOptions & {
    id?: undefined
    page: Page | string
    render: (element: ReactNode) => string | Promise<string>
    progress?: undefined
    setup(options: SetupOptions<SharedProps>): ReactElement
  }

export async function createInertiaApp<SharedProps extends PageProps>(
  options: InertiaAppOptionsForCSR<SharedProps>
): Promise<CreateInertiaAppSetupReturnType>
export async function createInertiaApp<SharedProps extends PageProps>(
  options: InertiaAppOptionsForSSR<SharedProps>
): Promise<CreateInertiaAppSSRContent>
export async function createInertiaApp<SharedProps extends PageProps>({
  id = 'app',
  resolve,
  setup,
  title,
  progress,
  page,
  render,
}:
  | InertiaAppOptionsForCSR<SharedProps>
  | InertiaAppOptionsForSSR<SharedProps>): Promise<
  CreateInertiaAppSetupReturnType | CreateInertiaAppSSRContent
> {
  const isServer = typeof window === 'undefined'
  const el = isServer ? null : document.getElementById(id)
  const initialPage: Page<SharedProps> =
    page || JSON.parse(el?.dataset.page as string)

  const resolveComponent = (name: string) =>
    Promise.resolve(resolve(name)).then((module) => {
      return typeof module === 'object' && !!module && 'default' in module
        ? module.default
        : module
    })

  let head: string[] = []

  const reactApp = await resolveComponent(initialPage.component).then(
    (initialComponent) => {
      return setup({
        el,
        App,
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
    progress()
  }

  if (isServer && render) {
    const body = await render(
      createElement(
        'div',
        {
          id,
          'data-page': JSON.stringify(initialPage),
        },
        reactApp as ReactNode
      )
    )

    return { head, body }
  }
}

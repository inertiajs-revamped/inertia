import {
  type HeadManagerOnUpdate,
  type HeadManagerTitleCallback,
  type Page,
  type PageProps,
  type PageResolver,
  setupProgress,
} from '@inertiajs-revamped/core'
import {
  type ComponentChild,
  type ComponentChildren,
  type ComponentType,
  type VNode,
  h,
} from 'preact'
import App from './App'

export type InertiaComponentType<P = {}> = ComponentType<P> & {
  layout?: ((page: VNode) => ComponentChildren) | Array<ComponentChildren>
}

export type SetupOptions<SharedProps extends PageProps> = {
  el: HTMLElement | null
  App: typeof App
  props: {
    initialPage: Page<SharedProps>
    initialComponent: InertiaComponentType
    resolveComponent: PageResolver<InertiaComponentType>
    titleCallback?: HeadManagerTitleCallback | undefined
    onHeadUpdate?: HeadManagerOnUpdate | null
  }
}

export type BaseInertiaAppOptions = {
  title?: HeadManagerTitleCallback
  resolve: PageResolver<InertiaComponentType>
}

export type CreateInertiaAppSetupReturnType = VNode | void
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
    setup(options: SetupOptions<SharedProps>): CreateInertiaAppSetupReturnType
  }

export type CreateInertiaAppSSRContent = { head: string[]; body: string }
export type InertiaAppOptionsForSSR<SharedProps extends PageProps> =
  BaseInertiaAppOptions & {
    id?: undefined
    page: Page | string
    render: (element: ComponentChildren) => string | Promise<string>
    progress?: undefined
    setup(options: SetupOptions<SharedProps>): VNode
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
  const el: HTMLElement | null = isServer
    ? null
    : <HTMLElement>document.getElementById(id)
  const initialPage: Page<SharedProps> =
    page || JSON.parse(el?.dataset.page as string)

  const resolveComponent = (name: string) =>
    Promise.resolve(resolve(name)).then((module) => {
      return typeof module === 'object' && !!module && 'default' in module
        ? module.default
        : module
    })

  let head: string[] = []

  const ReactApp = await resolveComponent(initialPage.component).then(
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
    setupProgress(progress)
  }

  if (isServer && render) {
    const body = await render(
      h(
        'div',
        {
          id,
          'data-page': JSON.stringify(initialPage),
        },
        // close to despair, but it's ok!
        ReactApp as ComponentChild
      )
    )

    return { head, body }
  }
}

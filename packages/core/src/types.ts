import type { AxiosProgressEvent, AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosProgressEvent {
    percentage: number | undefined
  }
}

export interface Modal {
  modal: HTMLDivElement | null
  listener: ((event: KeyboardEvent) => void) | null
  show(html: Record<string, unknown> | string): void
  hideOnEscape(event: KeyboardEvent): void
  hide(): void
}

export type HeadManager = {
  forceUpdate: () => void
  createProvider: () => {
    update: HeadManagerOnUpdate
    disconnect: () => void
  }
}

export type HeadManagerOnUpdate = (elements: string[]) => void
export type HeadManagerTitleCallback = (title: string) => string

export type Errors = Record<string, string>
export type ErrorBag = Record<string, Errors>

export type FormDataConvertible =
  | Array<FormDataConvertible>
  | { [key: string]: FormDataConvertible }
  | Blob
  | FormDataEntryValue
  | Date
  | boolean
  | number
  | null
  | undefined

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type RequestPayload = Record<string, FormDataConvertible> | FormData

export type PageProps<
  T extends Record<string, unknown> | unknown[] =
    | Record<string, unknown>
    | unknown[],
> = T

export type PagePropsBuiltIn = {
  errors: Errors & ErrorBag
}

export interface Page<SharedProps extends PageProps = PageProps> {
  component: string
  props: SharedProps & PagePropsBuiltIn
  url: string
  version: string | null

  /** @internal */
  scrollRegions: Array<{ top: number; left: number }>
  /** @internal */
  rememberedState: Record<string, unknown>
}

export type PageResolver<ModuleExportType extends Component = Component> = (
  name: string
) =>
  | Promise<{ default: ModuleExportType } | ModuleExportType>
  | ({ default: ModuleExportType } | ModuleExportType)

export type PageHandler = ({
  component,
  page,
  preserveState,
}: {
  component: Component
  page: Page<any>
  preserveState: PreserveStateOption
}) => Promise<unknown>

export type PreserveStateOption = boolean | 'errors' | ((page: Page) => boolean)

export type Progress =
  | (AxiosProgressEvent & {
      percentage: number | undefined
    })
  | undefined

export type ProgressOptions = {
  delay: number
  color: string
  includeCSS: boolean
  showSpinner: boolean
}

export type ProgressCallback = (options?: Partial<ProgressOptions>) => void

export type LocationVisit = {
  preserveScroll: boolean
}

export type Visit = {
  method: Method
  data: RequestPayload
  replace: boolean
  preserveScroll: PreserveStateOption
  preserveState: PreserveStateOption
  only: Array<string>
  except: Array<string>
  headers: Record<string, string>
  errorBag: string | null
  forceFormData: boolean
  queryStringArrayFormat: 'indices' | 'brackets'
}

export type GlobalEventsMap = {
  before: {
    parameters: [PendingVisit]
    details: {
      visit: PendingVisit
    }
    result: boolean | void
  }
  start: {
    parameters: [PendingVisit]
    details: {
      visit: PendingVisit
    }
    result: void
  }
  progress: {
    parameters: [Progress | undefined]
    details: {
      progress: Progress | undefined
    }
    result: void
  }
  finish: {
    parameters: [ActiveVisit]
    details: {
      visit: ActiveVisit
    }
    result: void
  }
  cancel: {
    parameters: []
    details: {}
    result: void
  }
  navigate: {
    parameters: [Page]
    details: {
      page: Page
    }
    result: void
  }
  success: {
    parameters: [Page]
    details: {
      page: Page
    }
    result: void
  }
  error: {
    parameters: [Errors]
    details: {
      errors: Errors
    }
    result: void
  }
  invalid: {
    parameters: [AxiosResponse]
    details: {
      response: AxiosResponse
    }
    result: boolean | void
  }
  exception: {
    parameters: [Error]
    details: {
      exception: Error
    }
    result: boolean | void
  }
}

export type GlobalEventNames = keyof GlobalEventsMap

export type GlobalEvent<TEventName extends GlobalEventNames> = CustomEvent<
  GlobalEventDetails<TEventName>
>

export type GlobalEventParameters<TEventName extends GlobalEventNames> =
  GlobalEventsMap[TEventName]['parameters']

export type GlobalEventResult<TEventName extends GlobalEventNames> =
  GlobalEventsMap[TEventName]['result']

export type GlobalEventDetails<TEventName extends GlobalEventNames> =
  GlobalEventsMap[TEventName]['details']

export type GlobalEventTrigger<TEventName extends GlobalEventNames> = (
  ...params: GlobalEventParameters<TEventName>
) => GlobalEventResult<TEventName>

export type GlobalEventCallback<TEventName extends GlobalEventNames> = (
  ...params: GlobalEventParameters<TEventName>
) => GlobalEventResult<TEventName>

export type VisitOptions = Partial<
  Visit & {
    onCancelToken: { ({ cancel }: { cancel: VoidFunction }): void }
    onBefore: GlobalEventCallback<'before'>
    onStart: GlobalEventCallback<'start'>
    onProgress: GlobalEventCallback<'progress'>
    onFinish: GlobalEventCallback<'finish'>
    onCancel: GlobalEventCallback<'cancel'>
    onSuccess: GlobalEventCallback<'success'>
    onError: GlobalEventCallback<'error'>
  }
>

export type PendingVisit = Visit & {
  url: URL
  completed: boolean
  cancelled: boolean
  interrupted: boolean
}

export type ActiveVisit = PendingVisit &
  Required<VisitOptions> & {
    cancelToken: AbortController
  }

export type VisitId = unknown
export type Component = unknown

export type InertiaAppResponse = Promise<{
  head: string[]
  body: string
} | void>

declare global {
  interface DocumentEventMap {
    'inertia:before': GlobalEvent<'before'>
    'inertia:start': GlobalEvent<'start'>
    'inertia:progress': GlobalEvent<'progress'>
    'inertia:success': GlobalEvent<'success'>
    'inertia:error': GlobalEvent<'error'>
    'inertia:invalid': GlobalEvent<'invalid'>
    'inertia:exception': GlobalEvent<'exception'>
    'inertia:finish': GlobalEvent<'finish'>
    'inertia:navigate': GlobalEvent<'navigate'>
  }
}

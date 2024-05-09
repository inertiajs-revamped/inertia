export { router } from '@inertiajs-revamped/core'

export { createInertiaApp } from './createInertiaApp'
export { Head, type InertiaHeadProps } from './head'
/** todo: refactor types */
export { Link, type InertiaLinkProps } from './link'

export { useForm, type InertiaFormProps } from './useForm'
export { usePage } from './app'
export { useRemember } from './useRemember'

export { resolvePageComponent } from '@inertiajs-revamped/core'

export * from './types'

export type {
  ActiveVisit,
  Component,
  DefaultPageProps,
  ErrorBag,
  Errors,
  FormDataConvertible,
  HeadManager,
  HeadManagerOnUpdate,
  HeadManagerTitleCallback,
  InertiaAppResponse,
  LocationVisit,
  Method,
  Modal,
  Page,
  PageHandler,
  PageProps,
  PageResolver,
  PendingVisit,
  PreserveStateOption,
  Progress,
  Renderer,
  RequestPayload,
  Router,
  Visit,
  VisitId,
  VisitOptions,
} from '@inertiajs-revamped/core'

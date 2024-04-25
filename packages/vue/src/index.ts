export { router } from '@inertiajs-revamped/core'
export { usePage } from './app'
export { default as createInertiaApp } from './createInertiaApp'
export { default as Head } from './head'
export { default as Link, type InertiaLinkProps } from './link'
export * from './types'
export { default as useForm, type InertiaForm } from './useForm'
export { default as useRemember } from './useRemember'

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

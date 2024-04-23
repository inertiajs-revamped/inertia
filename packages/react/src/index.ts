import { type Router, router as _Router } from '@inertiajs-revamped/core'

export const router: Router = _Router
export { default as createInertiaApp } from './createInertiaApp'
export { default as Head } from './Head'
export { default as Link, type InertiaLinkProps } from './Link'
export { default as useForm } from './useForm'
export { default as usePage } from './usePage'
export { default as useRemember } from './useRemember'

export type {
  ActiveVisit,
  Component,
  DefaultPageProps,
  ErrorBag,
  Errors,
  FormDataConvertible,
  HeadManager,
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

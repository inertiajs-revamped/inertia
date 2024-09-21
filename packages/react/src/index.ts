import { type Router, router as _Router } from '@inertiajs-revamped/core'

export const router: Router = _Router

export { createInertiaApp } from './createInertiaApp'
export { Head, type InertiaHeadProps } from './Head'
export { Link, type BaseInertiaLinkProps, type InertiaLinkProps } from './Link'

export { withLayout, type LayoutProps } from './helper'
export { useForm, type InertiaFormProps } from './useForm'
export { usePage } from './usePage'
export { useRemember } from './useRemember'

export { resolvePageComponent } from '@inertiajs-revamped/core'

export type {
  ActiveVisit,
  Component,
  ErrorBag,
  Errors,
  FormDataConvertible,
  HeadManager,
  HeadManagerOnUpdate,
  HeadManagerTitleCallback,
  InertiaAppResponse,
  LocationVisit,
  Method,
  Page,
  PageHandler,
  PageProps,
  PageResolver,
  PendingVisit,
  PreserveStateOption,
  Progress,
  RequestPayload,
  Router,
  Visit,
  VisitId,
  VisitOptions,
} from '@inertiajs-revamped/core'

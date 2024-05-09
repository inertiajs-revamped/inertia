import type { Page, PageProps } from '@inertiajs-revamped/core'
import { createContext } from 'preact'

const PageContext = createContext<Page<PageProps> | null>(null)
PageContext.displayName = 'InertiaPageContext'

export { PageContext }

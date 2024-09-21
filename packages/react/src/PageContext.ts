import type { Page, PageProps } from '@inertiajs-revamped/core'
import { createContext } from 'react'

const pageContext = createContext<Page<PageProps> | null>(null)
pageContext.displayName = 'InertiaPageContext'

export { pageContext as PageContext }

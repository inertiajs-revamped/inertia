import type { HeadManager } from '@inertiajs-revamped/core'
import { createContext } from 'react'

const headContext = createContext<HeadManager | null>(null)
headContext.displayName = 'InertiaHeadContext'

export { headContext as HeadContext }

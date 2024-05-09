import type { HeadManager } from '@inertiajs-revamped/core'
import { createContext } from 'react'

const HeadContext = createContext<HeadManager | null>(null)
HeadContext.displayName = 'InertiaHeadContext'

export { HeadContext }

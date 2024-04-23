import type { HeadManager } from '@inertiajs-revamped/core'
import { createContext } from 'preact'

const HeadContext = createContext<HeadManager | null>(null)
HeadContext.displayName = 'InertiaHeadContext'

export default HeadContext

import type { Integration } from '@/types'
import { useLocalStorage } from '@vueuse/core'

export function usePreferences() {
  const storage = useLocalStorage<Integration | undefined>(
    'inertia-docs-prefer-integration',
    null,
    {
      writeDefaults: false,
      shallow: true,
      initOnMounted: true,
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v),
      },
    }
  )

  return storage
}

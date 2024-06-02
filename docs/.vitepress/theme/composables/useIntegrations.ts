import type { Integration } from '@/types'
import { computed, inject } from 'vue'

export const useIntegrations = () =>
  inject<Integration[]>('integrations') as Integration[]

export const useIntegration = (name: string) => {
  const integrations = useIntegrations()
  const adapter = computed(
    () => integrations?.filter((int) => int.name === name)[0]
  )
  return adapter
}

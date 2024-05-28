import { inject } from 'vue'

export interface Integration {
  name: string
  description: string
  version: string
}

export const useIntegrations = () => inject('integrations') as Integration[]

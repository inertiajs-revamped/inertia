export interface Integration {
  name: string
  title: string
  description: string
  version: string
  url?: string | undefined
  componentExt?: 'tsx' | 'vue'
}

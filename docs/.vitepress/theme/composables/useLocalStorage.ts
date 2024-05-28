// https://github.com/codingwithjustin/quasar-note-app/blob/master/src/helper.js
// https://github.com/vue-avengers/vue-composable-utils/blob/main/src/useLocalStorage.js
import { onMounted, onUnmounted, ref, watch } from 'vue'

export function useLocalStorage<T = unknown[]>(key: string, defaultValue: T) {
  const value = ref(defaultValue)

  const read = () => {
    const v = window.localStorage.getItem(key)
    if (v != null) value.value = JSON.parse(v)
  }

  let initialized = false

  if (typeof window !== 'undefined') {
    read()
    initialized = true
  }

  onMounted(() => {
    if (!initialized) {
      read()
    }
    window.addEventListener('storage', read)
  })

  onUnmounted(() => {
    window.removeEventListener('storage', read)
  })

  const write = () => {
    window.localStorage.setItem(key, JSON.stringify(value.value))
  }

  watch([value], write, { deep: true })

  return value
}

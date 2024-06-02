// https://github.com/codingwithjustin/quasar-note-app/blob/master/src/helper.js
// https://github.com/vue-avengers/vue-composable-utils/blob/main/src/useLocalStorage.js
/* import { onMounted, onUnmounted, ref, watch } from 'vue' */
// https://github.com/codingwithjustin/quasar-note-app/blob/master/src/helper.js
// https://github.com/vue-avengers/vue-composable-utils/blob/main/src/useLocalStorage.js
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

export function useLocalStorage<T = undefined>(
  storageKey: string,
  defaultValue: T
) {
  const value = ref<T | undefined>(defaultValue)

  const init = () => {
    const item = localStorage.getItem(storageKey)
    if (item !== null) {
      value.value = parseItem(item)
      return
    }
  }

  const parseItem = (item: any) => {
    let value = null
    try {
      value = JSON.parse(item)
    } catch {
      value = item
    }

    return value
  }

  const handler = (event: StorageEvent) => {
    if (event.key === storageKey) {
      value.value = event.newValue ? parseItem(event.newValue) : null
    }
  }

  let initialized = false

  if (typeof window !== 'undefined') {
    init()
    initialized = true
  }

  onMounted(() => {
    if (!initialized) {
      init()
    }

    window.addEventListener('storage', handler, true)
  })

  watchEffect(() => {
    if (value.value) {
      localStorage.setItem(storageKey, JSON.stringify(value.value))
    }
  })

  onUnmounted(() => {
    window.removeEventListener('storage', handler)
  })

  const remove = () => {
    try {
      localStorage.removeItem(storageKey)
      value.value = undefined
    } catch (error) {
      // localStorage can throw.
      console.error(error)
    }
  }

  return {
    value,
    remove,
  }
}

/* export function useLocalStorage<T = unknown[]>(key: string, defaultValue: T) {
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
    window.addEventListener('storage', read, true)
  })

  onUnmounted(() => {
    window.removeEventListener('storage', read, true)
  })

  const write = () => {
    window.localStorage.setItem(key, JSON.stringify(value.value))
  }

  watch([value], write, { deep: true })

  return value
}
 */

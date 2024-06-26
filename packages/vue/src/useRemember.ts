import { router } from '@inertiajs-revamped/core'
import { deepClone } from '@visulima/deep-clone'
import { type Ref, isReactive, reactive, ref, watch } from 'vue'

export type RememberDefaults = {
  __rememberable?: boolean
  __remember?: Function
  __restore?: Function
}

export function useRemember<
  T extends object | string = Record<string, unknown>,
>(data: T & RememberDefaults, key?: string): Ref<T> | T {
  if (
    typeof data === 'object' &&
    data !== null &&
    data.__rememberable === false
  ) {
    return data
  }

  const restored = router.restore(key)

  const type = isReactive(data) ? reactive : ref

  const hasCallbacks =
    typeof data.__remember === 'function' &&
    typeof data.__restore === 'function'

  const remembered = type(
    restored === undefined
      ? data
      : hasCallbacks
        ? data.__restore?.(restored)
        : restored
  )

  watch(
    remembered,
    (newValue) => {
      router.remember(
        deepClone(hasCallbacks ? data.__remember?.() : newValue),
        key
      )
    },
    { immediate: true, deep: true }
  )

  return remembered
}

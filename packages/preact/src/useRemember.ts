import { router } from '@inertiajs-revamped/core'
import { type Dispatch, useEffect, useState } from 'preact/hooks'

export type SetStateAction<S> = S | ((prevState: S) => S)

export function useRemember<State>(
  initialState: State,
  key?: string
): [State, Dispatch<SetStateAction<State>>] {
  const [state, setState] = useState(() => {
    const restored = router.restore(key) as State

    return restored !== undefined ? restored : initialState
  })

  useEffect(() => {
    router.remember(state, key)
  }, [state, key])

  return [state, setState]
}

// replaced lodash.pickBy https://stackoverflow.com/a/58186870/6597226
export const pickBy = (obj: object, predicate = (v: unknown) => v) =>
  Object.entries(obj)
    .filter(([_k, v]) => predicate(v))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

// replaced https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_throttle
export function throttle<F extends (...params: any[]) => ReturnType<F>>(
  fn: F,
  timeFrame: number
) {
  let lastTime = 0
  return function (this: unknown, ...args: unknown[]) {
    const now = new Date().valueOf()
    if (now - lastTime >= timeFrame) {
      fn(this, ...args)
      lastTime = now
    }
  }
}

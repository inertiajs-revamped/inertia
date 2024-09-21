export function debounce<F extends (...params: any[]) => ReturnType<F>>(
  fn: F,
  delay: number
): F {
  let timeoutID: NodeJS.Timeout
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn.apply(this, args), delay)
  } as F
}

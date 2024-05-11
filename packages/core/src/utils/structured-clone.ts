/**
 * Creates a deep clone of an object.
 *
 * if `structuredClone` doesn't exist, returns a parsed JSON object
 *
 * @param input T
 * @returns T
 */
export function getStructuredClone<T>(input: T) {
  if (!window.structuredClone) {
    return JSON.parse(JSON.stringify(input)) as T
  }

  return window.structuredClone(input)
}

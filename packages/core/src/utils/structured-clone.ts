/**
 * Creates a deep clone of an object.
 *
 * if `structuredClone` doesn't exist, returns a parsed JSON object
 *
 * @param input T
 * @returns T
 */
export function getStructuredClone<T>(input: T): T {
  if (typeof window.structuredClone !== 'undefined') {
    return window.structuredClone(input)
  }
  return JSON.parse(JSON.stringify(input))
}

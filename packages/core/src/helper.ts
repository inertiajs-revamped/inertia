/** https://github.com/laravel/vite-plugin/blob/1.x/src/inertia-helpers/index.ts */

export async function resolvePageComponent<T>(
  path: string | string[],
  pages: Record<string, Promise<T> | (() => Promise<T>)>
): Promise<T> {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p]

    if (typeof page === 'undefined') {
      continue
    }

    return typeof page === 'function' ? page() : page
  }

  throw new Error(`Page not found: ${path}`)
}

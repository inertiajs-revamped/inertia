/** https://github.com/laravel/vite-plugin/blob/1.x/src/inertia-helpers/index.ts */
export async function resolvePageComponent(
  path: string | string[],
  pages: Record<string, Promise<any> | (() => Promise<any>)>
): Promise<any> | never {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p]

    if (typeof page === 'undefined') {
      continue
    }

    return typeof page === 'function' ? page() : page
  }

  throw new Error(`Page not found: ${path}`)
}

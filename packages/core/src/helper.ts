/** https://github.com/laravel/vite-plugin/blob/1.x/src/inertia-helpers/index.ts */

/**
 * The goal here is to still provide `resolvePageComponent` to the user, but without the need of specifying
 * a generic `ComponentType` type, since the frameworks `PageResolver<T>` now infers the type of Component.
 *
 * I removed the generic `<T>` because it did infer the `ReturnType` of `PageResolver` with recursion:
 * Any solution welcome.
 *
 * No overload matches this call.
 * Overload 1 of 2, '(options: InertiaAppOptionsForCSR<PageProps>): Promise<CreateInertiaAppSetupReturnType>', gave the following error.
 * Type 'Promise<InertiaComponentType<{}> | { default: InertiaComponentType<{}>; } | Promise<InertiaComponentType<{}> | { ...; }> |
 * (() => Promise<...>)>' is not assignable to type 'InertiaComponentType<{}> | Promise<InertiaComponentType<{}> |
 * { default: InertiaComponentType<{}>; }> | { ...; }'.
 */
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

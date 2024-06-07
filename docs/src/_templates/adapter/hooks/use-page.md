---
title: usePage
---

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# `usePage` <Badge type="warning">{{ adapter.name === 'vue' ? 'composable' : 'hook' }}</Badge>

Use the `usePage()` hook to access shared data in a component.

::: details Type Signature & Types

```typescript-vue
/** @internal */
interface DefaultPageProps {
  errors: Errors & ErrorBag;
}

/**
 * Returned by `usePage` and received as a prop on `Page<PageProps>`.
 *
 * Define shared interfaces with module augmentation.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation}
 *
 * @example
 * ```typescript
 * // resources/types/inertia-{{ adapter.name }}.d.ts
 * declare module '@inertiajs-revamped/{{ adapter.name }}' {
 *   interface PageProps {
 *     auth: {
 *       user: string
 *     }
 *     versions: {
 *       php: string
 *       laravel: string
 *     }
 *   }
 *
 *   interface DashboardPageProps extends PageProps {
 *     organizations: {
 *       data: App.Model.Organization[]
 *     }
 *   }
 * }
 * ```
 */
interface PageProps extends DefaultPageProps {}

declare function usePage<SharedProps extends PageProps = PageProps>(): Page<SharedProps>
```

:::

## Example

Define shared `interfaces` with [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

```typescript-vue
// inertia-{{ adapter.name }}.d.ts
declare module '@inertiajs-revamped/{{ adapter.name }}' {
  // define defaults
  interface PageProps {
    auth: {
      user: string
    }
    versions: {
      php: string
      laravel: string
    }
  }

  interface BlogPageProps extends PageProps {
    posts: BlogPost[]
  }

  type BlogPost = {
    id: number
    title: string
    description: string
    content: string
  }
}
```

### Usage with `props`

Use the `BlogPageProps` interface with `props`.

```typescript-vue
// blog-page.{{ adapter.componentExt }}
import type { BlogPageProps } from '@inertiajs-revamped/{{ adapter.name }}'

export function BlogPage(props: BlogPageProps) {
  // will infer type `BlogPost[]`
  console.log(props.posts)
}
```

### Usage with hook

Use the `usePage` hook in a component and pass the `HomePageProps` interface as [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html).

```typescript-vue
// blog-page.{{ adapter.componentExt }}
import { usePage, type BlogPageProps } from '@inertiajs-revamped/{{ adapter.name }}'

export function HomePage() {
  // will infer type `BlogPost[]`
  const props = usePage<BlogPageProps>().props
  console.log(props.posts)

  // or
  const { posts } = usePage<BlogPageProps>().props
  console.log(posts)
}
```

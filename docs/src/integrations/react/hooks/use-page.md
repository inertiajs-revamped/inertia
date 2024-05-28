# `usePage` <Badge type="warning" text="hook" />

Use the `usePage()` hook to access shared data in a component.

## Declaration

```ts
function usePage<SharedProps extends PageProps = PageProps>(): Page<SharedProps>
```

## Interface

Returned by `usePage` and received as a prop on the `PageContext.Provider`.

```ts
interface PageProps extends DefaultPageProps {}

/** @internal */
interface DefaultPageProps {
  errors: Errors & ErrorBag;
}
```

## Example

Define shared `interfaces` with [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

```ts
// inertia-react.d.ts
declare module '@inertiajs-revamped/react' {
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

  interface HomePageProps extends PageProps {
    blogPosts: BlogPost[]
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

Use the `HomePageProps` interface with `props`.

```ts
// home-page.tsx
import type { HomePageProps } from '@inertiajs-revamped/react'

export function HomePage(props: HomePageProps) {
  // will infer type `BlogPost[]`
  console.log(props.blogPosts)
}
```

### Usage with hook

Use the `usePage` hook in a component and pass the `HomePageProps` interface as [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html).

```ts
// home-page.tsx
import { usePage, type HomePageProps } from '@inertiajs-revamped/react'

export function HomePage() {
  // will infer type `BlogPost[]`
  const props = usePage<HomePageProps>().blogPosts
  console.log(props.blogPosts)

  // or
  const { blogPosts } = usePage<HomePageProps>()
  console.log(blogPosts)
}
```

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
const isVue = adapter.name === 'vue'
</script>

# Layouts

## Creating layouts

While not required, for most projects it makes sense to create a site layout that all of your pages can extend. You may have noticed in our page example above that we're wrapping the page content within a `<Layout>` component. Here's an example of such a component:

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link, type LayoutProps } from '@inertiajs-revamped/preact'

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <header>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </header>
      <article>{children}</article>
    </main>
  )
}
```

  </template>
  <template #react>

```tsx
import { Link, type LayoutProps } from '@inertiajs-revamped/react'

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <header>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </header>
      <article>{children}</article>
    </main>
  )
}
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link, type LayoutProps } from '@inertiajs-revamped/vue'

defineProps<LayoutProps>()
</script>

<template>
  <main>
    <header>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </header>
    <article>
      <slot />
    </article>
  </main>
</template>
```

  </template>
</AdapterWrapper>

As you can see, there is nothing Inertia specific within this template. This is just a typical {{ adapter.title }} component.

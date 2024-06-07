---
title: withLayout
---

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# `withLayout` <Badge type="warning">high-order-component</Badge>

Use the `withLayout` high-order component to help with type-hinted Persistent Layouts.

::: details Type Signature & Types

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```typescript
interface DefaultLayoutProps {
  title?: string
  children?: ComponentChildren
}

interface LayoutProps extends DefaultLayoutProps {}

type WithLayout = (
  layout: ComponentType<Expand<Omit<LayoutProps, "children">>>,
  props?: ComponentProps<typeof layout>
) => (page: VNode) => ComponentChildren

declare const withLayout: WithLayout
```

  </template>
  <template #react>

```typescript
interface DefaultLayoutProps {
  title?: string
}

interface LayoutProps extends PropsWithChildren<DefaultLayoutProps> {}

type WithLayout = (
  layout: ComponentType<Expand<Omit<LayoutProps, "children">>>,
  props?: ComponentPropsWithoutRef<typeof layout>
) => (page: ReactElement) => ReactNode

declare const withLayout: WithLayout
```

  </template>
  <template #vue>
    <span>n.a.</span>
  </template>
</AdapterWrapper>

:::

## Usage

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```tsx
import { withLayout } from '@inertiajs-revamped/preact'

function BlogPage() {
  return <div>Blog Page</div>
}

BlogPage.layout = withLayout(Layout, {
  title: 'Blog Page',
  // ...extra type-hinted props
})

export default BlogPage
```

  </template>
  <template #react>

```tsx
import { withLayout } from '@inertiajs-revamped/react'

function BlogPage() {
  return <div>Blog Page</div>
}

BlogPage.layout = withLayout(Layout, {
  title: 'Blog Page',
  // ...extra type-hinted props
})

export default BlogPage
```

  </template>
  <template #vue>
    <span>n.a.</span>
  </template>
</AdapterWrapper>

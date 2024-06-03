<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# `<Link>` <Badge type="tip" text="component" />

Use the`<Link>` component to create an Inertia link.

::: details Type Signature & Types

**Type Signature:**

```typescript
declare const Link: ForwardRefExoticComponent<InertiaLinkProps & RefAttributes<unknown>>
```

**Types:**

```typescript
interface BaseInertiaLinkProps {
  as?: string
  data?: Record<string, FormDataConvertible>
  href: string
  method?: Method
  headers?: Record<string, string>
  onClick?: (event: MouseEvent) => void
  preserveScroll?: PreserveStateOption
  preserveState?: PreserveStateOption
  replace?: boolean
  only?: string[]
  except?: string[]
  onCancelToken?: { ({ cancel }: { cancel: VoidFunction }): void }
  onBefore?: () => void
  onStart?: () => void
  onProgress?: (progress: Progress) => void
  onFinish?: () => void
  onCancel?: () => void
  onSuccess?: () => void
  onError?: () => void
  queryStringArrayFormat?: 'indices' | 'brackets'
}

type InertiaLinkProps = BaseInertiaLinkProps &
  Omit<HTMLAttributes<HTMLElement>, keyof BaseInertiaLinkProps> &
  Omit<AllHTMLAttributes<HTMLElement>, keyof BaseInertiaLinkProps>
```

:::

## `as`

Type: `string`

By default, Inertia renders links as anchor `<a>` elements. However, you can change the tag using the `as` attribute.

```tsx-vue
import { Link } from '@inertiajs-revamped/{{ adapter.name }}'

<Link href="/logout" method="post" as="button" type="button">Logout</Link>

// Renders as...
<button type="button">Logout</button>
```

::: warning
Creating `POST`/`PUT`/`PATCH`/`DELETE` anchor `<a>` links is discouraged as it causes "Open Link in New Tab / Window" accessibility issues. Instead, consider using a more appropriate element, such as a `<button>`.
:::

## `data`

Type: `Record<string, FormDataConvertible>`

When making `POST` or `PUT` requests, you may wish to add additional data to the request. You can accomplish this using the `data` attribute. The provided data can be an `object` or `FormData` instance.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link } from '@inertiajs-revamped/preact'

<Link href="/endpoint" method="post" data={{ foo: bar }}>Save</Link>
```

  </template>
  <template #react>

```tsx
import { Link } from '@inertiajs-revamped/react'

<Link href="/endpoint" method="post" data={{ foo: bar }}>Save</Link>
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <Link href="/endpoint" method="post" :data="{ foo: bar }">Save</Link>
</template>
```

  </template>
</AdapterWrapper>

## `href`

Type: `string`
Required: `true`

## `method`

Type: `Method`

You can specify the HTTP request method for an Inertia link request using the `method` attribute. The default method used by links is `GET`, but you can use the `method` attribute to make `POST`, `PUT`, `PATCH`, and `DELETE` requests via links.

```tsx-vue
import { Link } from '@inertiajs-revamped/{{ adapter.name }}'

<Link href="/logout" method="post" as="button">Logout</Link>
```

## `headers`

Type: `Record<string, string>`

The `headers` attribute allows you to add custom headers to an Inertia link. However, the headers Inertia uses internally to communicate its state to the server take priority and therefore cannot be overwritten.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link } from '@inertiajs-revamped/preact'

<Link href="/endpoint" headers={{ foo: bar }}>Save</Link>
```

  </template>
  <template #react>

```tsx
import { Link } from '@inertiajs-revamped/react'

<Link href="/endpoint" headers={{ foo: bar }}>Save</Link>
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <Link href="/endpoint" :headers="{ foo: bar }">Save</Link>
</template>
```

  </template>
</AdapterWrapper>

## `onClick`

Type: `(event: MouseEvent) => void`

## `preserveScroll`

Type: `PreserveStateOption`

You can use the `preserve-scroll` attribute to prevent Inertia from automatically resetting the scroll position when making a page visit.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link } from '@inertiajs-revamped/preact'

<Link preserveScroll href="/">Home</Link>
```

  </template>
  <template #react>

```tsx
import { Link } from '@inertiajs-revamped/react'

<Link preserveScroll href="/">Home</Link>
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <Link href="/" preserve-scroll>Home</Link>
</template>
```

  </template>
</AdapterWrapper>

::: tip
For more information on managing scroll position, please consult the documentation on scroll management.
:::

## `preserveState`

Type: `PreserveStateOption`

You can preserve a page component's local state using the `preserve-state` attribute. This will prevent a page component from fully re-rendering. The `preserve-state` attribute is especially helpful on pages that contain forms, since you can avoid manually repopulating input fields and can also maintain a focused input.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link } from '@inertiajs-revamped/preact'

<input onChange={this.handleChange} value={query} />

<Link href="/search" data={query} preserveState>Search</Link>
```

  </template>
  <template #react>

```tsx
import { Link } from '@inertiajs-revamped/react'

<input onChange={this.handleChange} value={query} />

<Link href="/search" data={query} preserveState>Search</Link>
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <input v-model="query" type="text" />

  <Link href="/search" :data="{ query }" preserve-state>Search</Link>
</template>
```

  </template>
</AdapterWrapper>

## `replace`

Type: `boolean`

The replace attribute allows you to specify the browser's history behaviour. By default, page visits push (new) state (`window.history.pushState`) into the history; however, it's also possible to replace state (`window.history.replaceState`) by setting the `replace` attribute to true. This will cause the visit to replace the current history state instead of adding a new history state to the stack.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link } from '@inertiajs-revamped/preact'

<Link replace href="/">Home</Link>
```

  </template>
  <template #react>

```tsx
import { Link } from '@inertiajs-revamped/react'

<Link replace href="/">Home</Link>
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <Link href="/" replace>Home</Link>
</template>
```

  </template>
</AdapterWrapper>

## `only`

Type: `string[]`

The `only` attribute allows you to specify that only a subset of a page's props (data) should be retrieved from the server on subsequent visits to that page.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Link } from '@inertiajs-revamped/preact'

<Link href="/users?active=true" only={['users']}>Show active</Link>
```

  </template>
  <template #react>

```tsx
import { Link } from '@inertiajs-revamped/react'

<Link href="/users?active=true" only={['users']}>Show active</Link>
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <Link href="/users?active=true" :only="['users']">Show active</Link>
</template>
```

  </template>
</AdapterWrapper>

::: tip
For more information on this topic, please consult the complete documentation on partial reloads.
:::

## `except`

Type: `string[]`

## `onCancelToken`

Type: `{ ({ cancel }: { cancel: VoidFunction }): void }`

## `onBefore`

Type: `() => void`

## `onStart`

Type: `() => void`

## `onProgress`

Type: `(progress: Progress) => void`

## `onFinish`

Type: `() => void`

## `onCancel`

Type: `() => void`

## `onSuccess`

Type: `() => void`

## `onError`

Type: `() => void`

## `queryStringArrayFormat`

Type: `'indices' | 'brackets'`

## Usage

Todo...

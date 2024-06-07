<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# `<Head>` <Badge type="tip" text="component" />

Use the`<Head>` component to manage your head tags like `<title>` & `<meta>`.

::: details Type Signature & Types

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```typescript
import type { ComponentChildren, FunctionComponent } from 'preact'

type InertiaHeadProps = {
  title?: string
  children?: ComponentChildren
}

type InertiaHead = FunctionComponent<InertiaHeadProps>

declare const Head: InertiaHead
```

  </template>
  <template #react>

```typescript
import type { FunctionComponent, PropsWithChildren } from 'react'

type InertiaHeadProps = PropsWithChildren<{
  title?: string
}>

type InertiaHead = FunctionComponent<InertiaHeadProps>

declare const Head: InertiaHead
```

  </template>
  <template #vue>

```typescript
type InertiaHeadProps = InstanceType<typeof Head>['$props'];

declare const Head: DefineComponent
```

  </template>
</AdapterWrapper>

:::

::: info Related API's:

- `titleCallback`

:::

## `title`

- Type: `string`

If you only need to add a `<title>` to the document `<head>`, you may simply pass the title as a prop to the `<Head>` component.

## `children`

- Type: `{{ adapter.name === 'preact' ? 'ComponentChildren' : '' }}{{ adapter.name === 'react' ? 'ReactNode' : 'DefineComponent' }}`

Within this component, you can include the `Elements` that you wish to add to the document `<head>`.

## Usage

```tsx-vue
import { Head } from '@inertiajs-revamped/{{ adapter.name }}'

<Head>
  <title>Your page title</title>
  <meta name="description" content="Your page description" />
</Head>
```

### Head extension

When building a real application, it can sometimes be helpful to create a custom head component that extends Inertia's `<Head>` component. This gives you a place to set app-wide defaults, such as appending the app name to the page title.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [resources/components/head.tsx]
import { Head as InertiaHead } from '@inertiajs-revamped/preact'

const Head = ({ title, children }) => {
  return (
    <InertiaHead>
      <title>{title ? `${title} - My App` : 'My App'}</title>
      {children}
    </InertiaHead>
  )
}

export default Site
```

:::

  </template>
  <template #react>

::: code-group

```tsx [resources/components/head.tsx]
import { Head as InertiaHead } from '@inertiajs-revamped/react'

const Head = ({ title, children }) => {
  return (
    <InertiaHead>
      <title>{title ? `${title} - My App` : 'My App'}</title>
      {children}
    </InertiaHead>
  )
}

export default Site
```

:::

  </template>
  <template #vue>

::: code-group

```vue [resources/components/head.vue]
<script setup>
import { Head } from '@inertiajs-revamped/vue'

defineProps({ title: String })
</script>

<template>
  <Head :title="title ? `${title} - My App` : 'My App'">
    <slot />
  </Head>
</template>
```

:::

  </template>
</AdapterWrapper>

### Multiple Head instances

It's possible to have multiple instances of the `<Head>` component throughout your application. For example, your layout can set some default `<Head>` elements, and then your individual pages can override those defaults.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

::: code-group

```tsx [resources/layouts/layout.tsx]
import { Head } from '@inertiajs-revamped/preact'

<Head>
  <title>My app</title>
  <meta
    head-key="description"
    name="description"
    content="This is the default description"
  />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</Head>
```

```tsx [resources/pages/about.tsx]
import { Head } from '@inertiajs-revamped/preact'

<Head>
  <title>About - My app</title>
  <meta
    head-key="description"
    name="description"
    content="This is a page specific description"
  />
</Head>
```

:::

  </template>
  <template #react>

::: code-group

```tsx [resources/layouts/layout.tsx]
import { Head } from '@inertiajs-revamped/react'

<Head>
  <title>My app</title>
  <meta
    head-key="description"
    name="description"
    content="This is the default description"
  />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</Head>
```

```tsx [resources/pages/about.tsx]
import { Head } from '@inertiajs-revamped/react'

<Head>
  <title>About - My app</title>
  <meta
    head-key="description"
    name="description"
    content="This is a page specific description"
  />
</Head>
```

:::

  </template>
  <template #vue>

::: code-group

```tsx [resources/layouts/layout.vue]
import { Head } from '@inertiajs-revamped/vue'

<Head>
  <title>My app</title>
  <meta
    head-key="description"
    name="description"
    content="This is the default description"
  />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</Head>
```

```tsx [resources/pages/about.vue]
import { Head } from '@inertiajs-revamped/vue'

<Head>
  <title>About - My app</title>
  <meta
    head-key="description"
    name="description"
    content="This is a page specific description"
  />
</Head>
```

:::

  </template>
</AdapterWrapper>

Inertia will only ever render one `<title>` tag; however, all other tags will be stacked since it's valid to have multiple instances of them. To avoid duplicate tags in your `<head>`, you can use the head-key property, which will make sure the tag is only rendered once. This is illustrated in the example above for the `<meta name="description">` tag.

The code example above will render the following HTML.

```html
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>About - My app</title>
  <meta name="description" content="This is a page specific description" />
</head>
```

---
title: useRemember
---

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# `useRemember` <Badge type="warning">{{ adapter.name === 'vue' ? 'composable' : 'hook' }}</Badge>

Use the `useRemember()` hook to save a local component state in the browser history.

::: details Type Signature & Types

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```typescript
declare function useRemember<State>(initialState: State, key?: string): [State, Dispatch<SetStateAction<State>>]
```

  </template>
  <template #react>

```typescript
declare function useRemember<State>(initialState: State, key?: string): [State, Dispatch<SetStateAction<State>>]
```

  </template>
  <template #vue>

```typescript
declare function useRemember<T extends object>(data: T & {
  __rememberable?: boolean
  __remember?: Function
  __restore?: Function
}, key?: string): Ref<T> | T
```

  </template>
</AdapterWrapper>

:::

## Overview

When navigating browser history, Inertia restores pages using prop data cached in history state. However, Inertia does not restore local page component state since this is beyond its reach. This can lead to outdated pages in your browser history.

For example, if a user partially completes a form, then navigates away, and then returns back, the form will be reset and their work will be lost.

To mitigate this issue, you can tell Inertia which local component state to save in the browser history.

## Saving local state

To save local component state to the history state, use the remember feature to tell Inertia which data it should remember.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```tsx
import { useRemember } from '@inertiajs-revamped/preact'

export default function Profile() {
  const [formState, setFormState] = useRemember({
    first_name: null,
    last_name: null,
    // ...
  })

  // ...
}
```

  </template>
  <template #react>

```tsx
import { useRemember } from '@inertiajs-revamped/react'

export default function Profile() {
  const [formState, setFormState] = useRemember({
    first_name: null,
    last_name: null,
    // ...
  })

  // ...
}
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { useRemember } from '@inertiajs-revamped/vue'

const form = useRemember({
  first_name: null,
  last_name: null,
})
</script>
```

  </template>
</AdapterWrapper>

Now, whenever your local form state changes, Inertia will automatically save this data to the history state and will also restore it on history navigation.

## Multiple components

If your page contains multiple components that use the remember functionality provided by Inertia, you need to provide a unique key for each component so that Inertia knows which data to restore to each component.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```tsx
import { useRemember } from '@inertiajs-revamped/preact'

export default function Profile() {
  const [formState, setFormState] = useRemember({
    first_name: null,
    last_name: null,
  }, 'users/create')
}
```

  </template>
  <template #react>

```tsx
import { useRemember } from '@inertiajs-revamped/react'

export default function Profile() {
  const [formState, setFormState] = useRemember({
    first_name: null,
    last_name: null,
  }, 'users/create')
}
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { useRemember } from '@inertiajs-revamped/vue'

const form = useRemember({
  first_name: null,
  last_name: null,
}, 'users/create')
</script>
```

  </template>
</AdapterWrapper>

<CustomBlock type="tip">
  Set a key as the second argument of <code>useRemember()</code>.
</CustomBlock>

If you have multiple instances of the same component on the page using the remember functionality, be sure to also include a unique key for each component instance, such as a model identifier.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```tsx
import { useRemember } from '@inertiajs-revamped/preact'

export default function Profile() {
  const [formState, setFormState] = useRemember({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
  }, `users/edit:${this.user.id}`)
}
```

  </template>
  <template #react>

```tsx
import { useRemember } from '@inertiajs-revamped/react'

export default function Profile() {
  const [formState, setFormState] = useRemember({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
  }, `users/edit:${this.user.id}`)
}
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { useRemember } from '@inertiajs-revamped/vue'

const props = defineProps({ user: Object })

const form = useRemember({
  first_name: null,
  last_name: null,
}, `users/edit:${props.user.id}`)
</script>
```

  </template>
</AdapterWrapper>

## Manually saving state

The hook watches for data changes and automatically save those changes to the `history` state. Then, Inertia will restore the data on page load.

However, it's also possible to manage this manually using the underlying `remember()` and `restore()` methods in Inertia.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>
  
```tsx
import { router } from '@inertiajs-revamped/preact'

router.remember(data, 'my-key')

// Restore local component state from history state...
let data = router.restore('my-key')
```

  </template>
  <template #react>

```tsx
import { router } from '@inertiajs-revamped/react'

router.remember(data, 'my-key')

// Restore local component state from history state...
let data = router.restore('my-key')
```

  </template>
  <template #vue>

```vue
<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Save local component state to history state...
router.remember(data, 'my-key')

// Restore local component state from history state...
let data = router.restore('my-key')
</script>
```

  </template>
</AdapterWrapper>

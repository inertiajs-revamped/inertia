<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
const isVue = adapter.componentExt === 'vue' ? 'ts' : 'tsx'
</script>

# Migration Guide

> [!Note]
> Due to significant upcoming changes planned for the underlying adapters, creating a detailed migration guide at this time wouldn't be very helpful.
>
> We understand this might be inconvenient, but rest assured we'll provide a comprehensive migration guide once the adapters updates are finalized.
>
> Thank you for your patience!

## Package Imports

`app.{{ isVue }}` -> `main.{{ isVue }}`

```typescript-vue
import { createInertiaApp } from '@inertiajs/{{ adapter.name }}' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
import { createProgress } from '@inertiajs-revamped/{{ adapter.name }}/progress' // [!code ++]

progress: { // [!code --]
  color: '#4B5563', // [!code --]
} // [!code --]
progress: () => // [!code ++]
  createProgress({ // [!code ++]
    color: '#4B5563', // [!code ++]
  }) // [!code ++]
```

`ssr.{{ isVue }}` <-> `ssr.{{ isVue }}`

```typescript-vue
import { createInertiaApp } from '@inertiajs/{{ adapter.name }}' // [!code --]
import createServer from '@inertiajs/{{ adapter.name }}/server' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
import { createServer } from '@inertiajs-revamped/{{ adapter.name }}/server' // [!code ++]
```

```typescript-vue
import { usePage } from '@inertiajs/{{ adapter.name }}' // [!code --]
import { usePage } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
```

```typescript-vue
import { useForm } from '@inertiajs/pre{{ adapter.name }}act' // [!code --]
import { useForm } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
```

```typescript-vue
import { useRemember } from '@inertiajs/{{ adapter.name }}' // [!code --]
import { useRemember } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
```

```typescript-vue
import { Head } from '@inertiajs/{{ adapter.name }}' // [!code --]
import { Head } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
```

```typescript-vue
import { Link } from '@inertiajs/{{ adapter.name }}' // [!code --]
import { Link } from '@inertiajs-revamped/{{ adapter.name }}' // [!code ++]
```

## Changelog - @inertiajs-revamped/{{ adapter.name }}

<div v-if="adapter.name === 'preact'">
<!--@include: ../../../../../packages/preact/CHANGELOG.md{2,}-->
</div>
<div v-else-if="adapter.name === 'react'">
<!--@include: ../../../../../packages/react/CHANGELOG.md{2,}-->
</div>
<div v-else-if="adapter.name === 'vue'">
<!--@include: ../../../../../packages/vue/CHANGELOG.md{2,}-->
</div>

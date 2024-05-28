# Migration Guide

<!--@include: ../../../_templates/parts/migration-note.md-->

## Package Imports

`app.ts` -> `main.ts`

```ts
import { createInertiaApp } from '@inertiajs/vue' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue' // [!code ++]
import { createProgress } from '@inertiajs-revamped/vue/progress' // [!code ++]

progress: { // [!code --]
  color: '#4B5563', // [!code --]
} // [!code --]
progress: () => // [!code ++]
  createProgress({ // [!code ++]
    color: '#4B5563', // [!code ++]
  }) // [!code ++]
```

`ssr.ts` <-> `ssr.ts`

```ts
import { createInertiaApp } from '@inertiajs/vue' // [!code --]
import createServer from '@inertiajs/vue/server' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue' // [!code ++]
import { createServer } from '@inertiajs-revamped/vue/server' // [!code ++]
```

```ts
import { usePage } from '@inertiajs/vue' // [!code --]
import { usePage } from '@inertiajs-revamped/vue' // [!code ++]
```

```ts
import { useForm } from '@inertiajs/vue' // [!code --]
import { useForm } from '@inertiajs-revamped/vue' // [!code ++]
```

```ts
import { useRemember } from '@inertiajs/vue' // [!code --]
import { useRemember } from '@inertiajs-revamped/vue' // [!code ++]
```

```ts
import { Head } from '@inertiajs/vue' // [!code --]
import { Head } from '@inertiajs-revamped/vue' // [!code ++]
```

```ts
import { Link } from '@inertiajs/vue' // [!code --]
import { Link } from '@inertiajs-revamped/vue' // [!code ++]
```

<!--@include: ../../../_templates/parts/changelogs-note.md-->

## Changelog - @inertiajs-revamped/vue

<!--@include: ../../../../../packages/vue/CHANGELOG.md{2,}-->

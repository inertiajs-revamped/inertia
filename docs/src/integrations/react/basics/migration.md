# Migration Guide

<!--@include: ../../../_templates/parts/migration-note.md-->

## Package Imports

`app.tsx` -> `main.tsx`

```ts
import { createInertiaApp } from '@inertiajs/react' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/react' // [!code ++]
import { createProgress } from '@inertiajs-revamped/react/progress' // [!code ++]

progress: { // [!code --]
  color: '#4B5563', // [!code --]
} // [!code --]
progress: () => // [!code ++]
  createProgress({ // [!code ++]
    color: '#4B5563', // [!code ++]
  }) // [!code ++]
```

`ssr.tsx` <-> `ssr.tsx`

```ts
import { createInertiaApp } from '@inertiajs/react' // [!code --]
import createServer from '@inertiajs/react/server' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/react' // [!code ++]
import { createServer } from '@inertiajs-revamped/react/server' // [!code ++]
```

```ts
import { usePage } from '@inertiajs/react' // [!code --]
import { usePage } from '@inertiajs-revamped/react' // [!code ++]
```

```ts
import { useForm } from '@inertiajs/react' // [!code --]
import { useForm } from '@inertiajs-revamped/react' // [!code ++]
```

```ts
import { useRemember } from '@inertiajs/react' // [!code --]
import { useRemember } from '@inertiajs-revamped/react' // [!code ++]
```

```ts
import { Head } from '@inertiajs/react' // [!code --]
import { Head } from '@inertiajs-revamped/react' // [!code ++]
```

```ts
import { Link } from '@inertiajs/react' // [!code --]
import { Link } from '@inertiajs-revamped/react' // [!code ++]
```

<!--@include: ../../../_templates/parts/changelogs-note.md-->

## Changelog - @inertiajs-revamped/react

<!--@include: ../../../../../packages/react/CHANGELOG.md{2,}-->

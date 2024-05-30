# Migration Guide

<!--@include: ../../../_templates/parts/migration-note.md-->

## Package Imports

`app.tsx` -> `main.tsx`

```typescript
import { createInertiaApp } from '@inertiajs/preact' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/preact' // [!code ++]
import { createProgress } from '@inertiajs-revamped/preact/progress' // [!code ++]

progress: { // [!code --]
  color: '#4B5563', // [!code --]
} // [!code --]
progress: () => // [!code ++]
  createProgress({ // [!code ++]
    color: '#4B5563', // [!code ++]
  }) // [!code ++]
```

`ssr.tsx` <-> `ssr.tsx`

```typescript
import { createInertiaApp } from '@inertiajs/preact' // [!code --]
import createServer from '@inertiajs/preact/server' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/preact' // [!code ++]
import { createServer } from '@inertiajs-revamped/preact/server' // [!code ++]
```

```typescript
import { usePage } from '@inertiajs/preact' // [!code --]
import { usePage } from '@inertiajs-revamped/preact' // [!code ++]
```

```typescript
import { useForm } from '@inertiajs/preact' // [!code --]
import { useForm } from '@inertiajs-revamped/preact' // [!code ++]
```

```typescript
import { useRemember } from '@inertiajs/preact' // [!code --]
import { useRemember } from '@inertiajs-revamped/preact' // [!code ++]
```

```typescript
import { Head } from '@inertiajs/preact' // [!code --]
import { Head } from '@inertiajs-revamped/preact' // [!code ++]
```

```typescript
import { Link } from '@inertiajs/preact' // [!code --]
import { Link } from '@inertiajs-revamped/preact' // [!code ++]
```

<!--@include: ../../../_templates/parts/changelogs-note.md-->

## Changelog - @inertiajs-revamped/preact

<!--@include: ../../../../../packages/preact/CHANGELOG.md{2,}-->

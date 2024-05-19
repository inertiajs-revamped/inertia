---
next: 'Laravel - Installation'
---

# Migration

## Note

> [!IMPORTANT]
> Due to significant upcoming changes planned for the underlying adapters, creating a detailed migration guide at this time wouldn't be very helpful.
>
> We understand this might be inconvenient, but rest assured we'll provide a comprehensive migration guide once the adapters updates are finalized.
>
> Thank you for your patience!

## Package Imports

::: code-group

```ts [react]
// app.tsx -> main.tsx
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

// ssr.tsx <-> ssr.tsx
import { createInertiaApp } from '@inertiajs/react' // [!code --]
import createServer from '@inertiajs/react/server' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/react' // [!code ++]
import { createServer } from '@inertiajs-revamped/react/server' // [!code ++]

import { usePage } from '@inertiajs/react' // [!code --]
import { usePage } from '@inertiajs-revamped/react' // [!code ++]

import { useForm } from '@inertiajs/react' // [!code --]
import { useForm } from '@inertiajs-revamped/react' // [!code ++]

import { useRemember } from '@inertiajs/react' // [!code --]
import { useRemember } from '@inertiajs-revamped/react' // [!code ++]

import { Head } from '@inertiajs/react' // [!code --]
import { Head } from '@inertiajs-revamped/react' // [!code ++]

import { Link } from '@inertiajs/react' // [!code --]
import { Link } from '@inertiajs-revamped/react' // [!code ++]
```

```ts [vue]
// app.ts -> main.ts
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

// ssr.ts <-> ssr.ts
import { createInertiaApp } from '@inertiajs/vue' // [!code --]
import createServer from '@inertiajs/vue/server' // [!code --]
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers' // [!code --]
import { createInertiaApp, resolvePageComponent } from '@inertiajs-revamped/vue' // [!code ++]
import { createServer } from '@inertiajs-revamped/vue/server' // [!code ++]

import { usePage } from '@inertiajs/vue' // [!code --]
import { usePage } from '@inertiajs-revamped/vue' // [!code ++]

import { useForm } from '@inertiajs/vue' // [!code --]
import { useForm } from '@inertiajs-revamped/vue' // [!code ++]

import { useRemember } from '@inertiajs/vue' // [!code --]
import { useRemember } from '@inertiajs-revamped/vue' // [!code ++]

import { Head } from '@inertiajs/vue' // [!code --]
import { Head } from '@inertiajs-revamped/vue' // [!code ++]

import { Link } from '@inertiajs/vue' // [!code --]
import { Link } from '@inertiajs-revamped/vue' // [!code ++]
```

:::

## Changelogs

See the `CHANGELOG.md` from the [packages](https://github.com/inertiajs-revamped/inertia/tree/main/packages) for a full list of changes.

Below you can find the initial package changelogs from the forked/migrated packages.

## Changelog - @inertiajs-revamped/core

### v0.0.1 - (2024-04-27)

- Initial release based on [@inertiajs/core](https://github.com/inertiajs/inertia) (v1.0.15)

#### Refactor

- Bump minimum Node.js version to [18.12.0](https://nodejs.org/en/blog/release/v18.12.0) (Node.js 18+ is required)
- Replace build tool esbuild with pkgroll
- Enable tsconfig.json options `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- Remove tsconfig.json `noEmitOnError` option
- Remove tsconfig.json options `types` & `typeRoots`

#### Bug Fixes

- Fix package.json type `exports` not resolved correctly
- Fix monorepo tsconfig.json `paths` setup to import from ts source files instead of bundle

#### Dependencies

- Update dependency axios to v1.6.8
- Update dependency deepmerge to v4.3.1
- Update dependency qs to v6.12.0
- Update dependency @types/qs to v6.9.14
- Update dependency @types/nprogress to v0.2.3
- Update dependency @types/node to v20.12.5
- Move axios to `peerDependencies`
- Move @types/qs & @types/nprogress to `dependencies` to ensure externalization
- Remove esbuild & esbuild-node-externals
- Remove deprecated @types/deepmerge

## Changelog - @inertiajs-revamped/laravel

### v0.0.1 - (2024-04-27)

- Initial release based on [@inertiajs/inertia-laravel](https://github.com/inertiajs/inertia-laravel) (v1.0.0)

## Changelog - @inertiajs-revamped/preact

### v0.0.1 - (2024-04-27)

- Initial release based on [@inertiajs-revamped/react](https://github.com/inertiajs-revamped/inertia) (v0.0.1)

## Changelog - @inertiajs-revamped/react

### v0.0.1 - (2024-04-27)

- Initial release based on [@inertiajs/react](https://github.com/inertiajs/inertia) (v1.0.15)

#### Refactor

- Bump minimum Node.js version to [18.12.0](https://nodejs.org/en/blog/release/v18.12.0) (Node.js 18+ is required)
- Drop support for React `16.x` & `17.x` (React 18+ is required)
- Replace build tool esbuild with pkgroll
- Enable tsconfig.json options `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- Remove tsconfig.json `noEmitOnError` option
- Remove tsconfig.json options `types` & `typeRoots`

#### Bug Fixes

- Fix package.json type `exports` not resolved correctly
- Fix monorepo tsconfig.json `paths` setup to import from ts source files instead of bundle

#### Dependencies

- Add missing @types/node to `devDependencies`
- Add missing @types/lodash.isequal to `dependencies`
- Add missing react-dom to `peerDependencies`
- Update dependency @types/react to v18.2.74
- Update dependency @types/react-dom to v18.2.24
- Move @types/react & @types/react-dom to `dependencies` to ensure externalization
- Remove `esbuild` & `typescript`

## Changelog - @inertiajs-revamped/vue

### v0.0.1 - (2024-04-27)

- Initial release based on [@inertiajs/vue](https://github.com/inertiajs/inertia) (v1.0.15)

#### Refactor

- Bump minimum Node.js version to [18.12.0](https://nodejs.org/en/blog/release/v18.12.0) (Node.js 18+ is required)
- Replace build tool esbuild with pkgroll
- Enable tsconfig.json options `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- Remove tsconfig.json `noEmitOnError` option
- Remove tsconfig.json options `types` & `typeRoots`

#### Bug Fixes

- Fix package.json type `exports` not resolved correctly
- Fix monorepo tsconfig.json `paths` setup to import from ts source files instead of bundle

#### Dependencies

- Add missing @types/node to `devDependencies`
- Add missing @types/lodash.isequal & @types/lodash.deepequal to `dependencies`
- Remove `esbuild` & `typescript`

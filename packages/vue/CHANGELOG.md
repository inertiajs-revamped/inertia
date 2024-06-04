# Changelog - @inertiajs-revamped/vue

## 0.0.7 (2024-06-03)

### Builds

- update dependency @types/node to ^20.14.0 ([2340303](https://github.com/inertiajs-revamped/inertia/commit/2340303))

## 0.0.6 (2024-05-19)

### Features

- exclude properties from partial responses, based on (inertia PR 1876) ([9e8d903](https://github.com/inertiajs-revamped/inertia/commit/9e8d903))

### Builds

- update dependency @types/node to ^20.12.12 ([e3c265f](https://github.com/inertiajs-revamped/inertia/commit/e3c265f))

## 0.0.5 (2024-05-11)

### Code Refactoring

- replace lodash.isequal with fast-equals ([6717177](https://github.com/inertiajs-revamped/inertia/commit/6717177))
- replace lodash.clonedeep with structured-clone ([ead17d5](https://github.com/inertiajs-revamped/inertia/commit/ead17d5))

### Builds

- remove lodash.clonedeep ([5982948](https://github.com/inertiajs-revamped/inertia/commit/5982948))

## 0.0.4 (2024-05-11)

### Code Refactoring

- replace `default` with named exports ([bef108b](https://github.com/inertiajs-revamped/inertia/commit/bef108b))

### Bug Fixes

- infer prop types from `InstanceType`, add missing exports, closes #39 ([ea52af0](https://github.com/inertiajs-revamped/inertia/commit/ea52af0))
- fix setup `props` type error ([3fb081a](https://github.com/inertiajs-revamped/inertia/commit/3fb081a))

### Builds

- update vue monorepo to ^3.4.27 ([6a900cb](https://github.com/inertiajs-revamped/inertia/commit/6a900cb))
- update dependency @types/node to ^20.12.11 ([96686b8](https://github.com/inertiajs-revamped/inertia/commit/96686b8))

## 0.0.3 (2024-05-04)

### Bug Fixes

- add missing progress exports ([d914a3f](https://github.com/inertiajs-revamped/inertia/commit/d914a3f))

## 0.0.2 (2024-05-02)

### Code Refactoring

- replace default with named export in progress.ts ([094c62a](https://github.com/inertiajs-revamped/inertia/commit/094c62a))
- replace default with named export in server.ts ([8e3942e](https://github.com/inertiajs-revamped/inertia/commit/8e3942e))

### Bug Fixes

- fix `peerDependencies` version ([1ea65a6](https://github.com/inertiajs-revamped/inertia/commit/1ea65a6))
- fix type exports ([fd75385](https://github.com/inertiajs-revamped/inertia/commit/fd75385))

### Builds

- update vue monorepo to ^3.4.26 (`@vue/runtime-core`, `vue`) ([4ed9205](https://github.com/inertiajs-revamped/inertia/commit/4ed9205))
- update dependency @types/node to ^20.12.8 ([2d1a120](https://github.com/inertiajs-revamped/inertia/commit/2d1a120))

## 0.0.1 (2024-04-26)

### Features

- add aria-role for non anchor `<Link>` tags (based on [inertia/pull/1762](inertiajs/inertia#1762)) ([67c251b](https://github.com/inertiajs-revamped/inertia/commit/67c251b))
- check `as`, before convert to lowercase (based on [inertia/pull/1297](inertiajs/inertia#1297)) ([87b6d12](https://github.com/inertiajs-revamped/inertia/commit/87b6d12))
- export function `resolvePageComponent` from core ([bf52de5](https://github.com/inertiajs-revamped/inertia/commit/bf52de5))

### Code Refactoring

- export `createProgress` from adapters, excludes progress from bundle by default ([42c9479](https://github.com/inertiajs-revamped/inertia/commit/42c9479))
- export `default as createServer` to avoid forcing `allowSyntheticDefaultImports` flag ([f0ea6f5](https://github.com/inertiajs-revamped/inertia/commit/f0ea6f5))
- replace return type of `headManager` with `HeadManager` type ([105f343](https://github.com/inertiajs-revamped/inertia/commit/105f343))
- add `InertiaComponentType` type ([52a1bfc](https://github.com/inertiajs-revamped/inertia/commit/52a1bfc))
- replace inline types with types from core package ([dfef9b3](https://github.com/inertiajs-revamped/inertia/commit/dfef9b3))
- restructure exports ([0b03808](https://github.com/inertiajs-revamped/inertia/commit/0b03808))

### Bug Fixes

- check for `null`, remove invalid type assignments for head ([79a9e30](https://github.com/inertiajs-revamped/inertia/commit/79a9e30))
- fix wrong `preserveScroll` types in link.ts ([7836ba4](https://github.com/inertiajs-revamped/inertia/commit/7836ba4))
- fix all type errors in link.ts ([cd6d756](https://github.com/inertiajs-revamped/inertia/commit/cd6d756))
- use `PreserveStateOption` from core package ([9df6050](https://github.com/inertiajs-revamped/inertia/commit/9df6050))
- remove invalid type assignments for link ([ef503f2](https://github.com/inertiajs-revamped/inertia/commit/ef503f2))
- add missing event types ([7546bd1](https://github.com/inertiajs-revamped/inertia/commit/7546bd1))
- remove line breaks in link.ts warn, fixes minified bundle mess ([c9f9153](https://github.com/inertiajs-revamped/inertia/commit/c9f9153))
- fix `onCancelToken` type in link.ts ([5374426](https://github.com/inertiajs-revamped/inertia/commit/5374426))
- fix type errors & remove invalid type assignments ([3e29b0b](https://github.com/inertiajs-revamped/inertia/commit/3e29b0b))
- add missing string types in remember.ts ([ad3b6d9](https://github.com/inertiajs-revamped/inertia/commit/ad3b6d9))
- re-export all types from core package ([a716e00](https://github.com/inertiajs-revamped/inertia/commit/a716e00))
- check for `undefined` in `useRemember()`, fixes multiple ts(2722) ([ed15c23](https://github.com/inertiajs-revamped/inertia/commit/ed15c23))
- remove useless rename of `default` export in server.ts ([22e17de](https://github.com/inertiajs-revamped/inertia/commit/22e17de))
- ensure that all imports used only as a type use a type-only `import` ([bb5bc8d](https://github.com/inertiajs-revamped/inertia/commit/bb5bc8d))

### Builds

- add @vue/runtime-core to `devDependencies` ([37025d9](https://github.com/inertiajs-revamped/inertia/commit/37025d9))

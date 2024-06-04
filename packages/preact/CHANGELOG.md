# Changelog - @inertiajs-revamped/preact

## 0.0.6 (2024-06-03)

### Builds

- update dependency @types/node to ^20.14.0 ([2340303](https://github.com/inertiajs-revamped/inertia/commit/2340303))

## 0.0.5 (2024-05-19)

### Features

- exclude properties from partial responses, based on (inertia PR 1876) ([aed43d0](https://github.com/inertiajs-revamped/inertia/commit/aed43d0))

### Builds

- update dependency preact to v10.22.0 ([85258f0](https://github.com/inertiajs-revamped/inertia/commit/85258f0))
- update dependency @types/node to ^20.12.12 ([e3c265f](https://github.com/inertiajs-revamped/inertia/commit/e3c265f))

## 0.0.4 (2024-05-15)

### Features

- allow set processing to be set on react adaptors ([fe8e2c7](https://github.com/inertiajs-revamped/inertia/commit/fe8e2c7))

### Code Refactoring

- replace lodash.isequal with fast-equals ([6717177](https://github.com/inertiajs-revamped/inertia/commit/6717177))

## 0.0.3 (2024-05-11)

### Code Refactoring

- replace `default` with named exports ([6445559](https://github.com/inertiajs-revamped/inertia/commit/6445559))

### Bug Fixes

- add type annotation to explicitly specify the type of `Link` & `App`, omits default-wildcard imports from d.ts bundle ([0017660](https://github.com/inertiajs-revamped/inertia/commit/0017660))
- fix `Link.onClick` event not fired ([b0123b6](https://github.com/inertiajs-revamped/inertia/commit/b0123b6))

### Builds

- update dependency @types/node to ^20.12.11 ([96686b8](https://github.com/inertiajs-revamped/inertia/commit/96686b8))
- update dependency preact to >=10.21.0 ([f5fba01](https://github.com/inertiajs-revamped/inertia/commit/f5fba01))

## 0.0.2 (2024-05-02)

### Code Refactoring

- replace default with named export in progress.ts ([5c9fee5](https://github.com/inertiajs-revamped/inertia/commit/5c9fee5))
- replace default with named export in server.ts ([b5e552c](https://github.com/inertiajs-revamped/inertia/commit/b5e552c))

### Bug Fixes

- fix `peerDependencies` version ([ae04de8](https://github.com/inertiajs-revamped/inertia/commit/ae04de8))
- fix type exports ([54779a5](https://github.com/inertiajs-revamped/inertia/commit/54779a5))

### Builds

- update dependency @types/node to ^20.12.8 ([2d1a120](https://github.com/inertiajs-revamped/inertia/commit/2d1a120))
- update dependency preact to ^10.21.0 ([35e63ae](https://github.com/inertiajs-revamped/inertia/commit/35e63ae))

## 0.0.1 (2024-04-26)

### Code Refactoring

- export `createProgress` from adapters, excludes progress from bundle by default ([42145a0](https://github.com/inertiajs-revamped/inertia/commit/42145a0))
- export `default as createServer` to avoid forcing `allowSyntheticDefaultImports` flag ([47b59a8](https://github.com/inertiajs-revamped/inertia/commit/47b59a8))

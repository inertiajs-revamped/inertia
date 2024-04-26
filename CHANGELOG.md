# Changelog - @inertiajs-revamped/core

## v0.0.1 - unreleased

- Initial release based on [@inertiajs/core](https://github.com/inertiajs/inertia) (v1.0.15)

### Refactor

- Bump minimum Node.js version to [18.12.0](https://nodejs.org/en/blog/release/v18.12.0) (Node.js 18+ is required)
- Replace build tool esbuild with pkgroll
- Enable tsconfig.json options `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- Remove tsconfig.json `noEmitOnError` option
- Remove tsconfig.json options `types` & `typeRoots`

### Bug Fixes

- Fix package.json type `exports` not resolved correctly
- Fix monorepo tsconfig.json `paths` setup to import from ts source files instead of bundle

### Dependencies

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

# Changelog - @inertiajs-revamped/laravel

## v0.0.1 - unreleased

- Initial release based on [@inertiajs/inertia-laravel](https://github.com/inertiajs/inertia-laravel) (v1.0.0)

# Changelog - @inertiajs-revamped/preact

## v0.0.1 - unreleased

- Initial release based on [@inertiajs-revamped/react](https://github.com/inertiajs-revamped/inertia) (v0.0.1)

# Changelog - @inertiajs-revamped/react

## v0.0.1 - unreleased

- Initial release based on [@inertiajs/react](https://github.com/inertiajs/inertia) (v1.0.15)

### Refactor

- Bump minimum Node.js version to [18.12.0](https://nodejs.org/en/blog/release/v18.12.0) (Node.js 18+ is required)
- Drop support for React `16.x` & `17.x` (React 18+ is required)
- Replace build tool esbuild with pkgroll
- Enable tsconfig.json options `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- Remove tsconfig.json `noEmitOnError` option
- Remove tsconfig.json options `types` & `typeRoots`

### Bug Fixes

- Fix package.json type `exports` not resolved correctly
- Fix monorepo tsconfig.json `paths` setup to import from ts source files instead of bundle

### Dependencies

- Add missing @types/node to `devDependencies`
- Add missing @types/lodash.isequal to `dependencies`
- Add missing react-dom to `peerDependencies`
- Update dependency @types/react to v18.2.74
- Update dependency @types/react-dom to v18.2.24
- Move @types/react & @types/react-dom to `dependencies` to ensure externalization
- Remove `esbuild` & `typescript`

# Changelog - @inertiajs-revamped/vue

## v0.0.1 - unreleased

- Initial release based on [@inertiajs/vue](https://github.com/inertiajs/inertia) (v1.0.15)

### Refactor

- Bump minimum Node.js version to [18.12.0](https://nodejs.org/en/blog/release/v18.12.0) (Node.js 18+ is required)
- Replace build tool esbuild with pkgroll
- Enable tsconfig.json options `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- Remove tsconfig.json `noEmitOnError` option
- Remove tsconfig.json options `types` & `typeRoots`

### Bug Fixes

- Fix package.json type `exports` not resolved correctly
- Fix monorepo tsconfig.json `paths` setup to import from ts source files instead of bundle

### Dependencies

- Add missing @types/node to `devDependencies`
- Add missing @types/lodash.isequal & @types/lodash.deepequal to `dependencies`
- Remove `esbuild` & `typescript`

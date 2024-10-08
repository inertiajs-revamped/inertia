# Changelog - @inertiajs-revamped/core

## 0.1.0 (2024-09-21)

### Code Refactoring

- apply multiple recent fixes ([bb148d1](https://github.com/inertiajs-revamped/inertia/commit/bb148d1))
- apply recent fixes ([b0334ab](https://github.com/inertiajs-revamped/inertia/commit/b0334ab))
- sync with original repo ([01c932b](https://github.com/inertiajs-revamped/inertia/commit/01c932b))

### Builds

- update dependency axios to >=1.7.7 ([7fe4c4b](https://github.com/inertiajs-revamped/inertia/commit/7fe4c4b))
- update dependency @types/qs to ^6.9.16 ([f3050ce](https://github.com/inertiajs-revamped/inertia/commit/f3050ce))
- update dependency @types/node to ^22.5.5 ([6e7a58c](https://github.com/inertiajs-revamped/inertia/commit/6e7a58c))
- update dependencies ([53b9803](https://github.com/inertiajs-revamped/inertia/commit/53b9803))
- update dependency @types/node to ^20.16.3 ([748b9a9](https://github.com/inertiajs-revamped/inertia/commit/748b9a9))
- update dependency @types/node to ^20.16.2 ([65c3aa1](https://github.com/inertiajs-revamped/inertia/commit/65c3aa1))
- update dependency axios to >=1.7.4 ([9ea5b4f](https://github.com/inertiajs-revamped/inertia/commit/9ea5b4f))
- update dependency axios to >=1.7.3 ([884b363](https://github.com/inertiajs-revamped/inertia/commit/884b363))
- update dependency @types/node to ^20.14.14 ([c84855e](https://github.com/inertiajs-revamped/inertia/commit/c84855e))
- update dependency @types/node to ^20.14.13 ([3d9474c](https://github.com/inertiajs-revamped/inertia/commit/3d9474c))
- update dependency qs to ^6.12.3 ([160a7db](https://github.com/inertiajs-revamped/inertia/commit/160a7db))
- update dependency @types/node to ^20.14.10 ([ac8db8b](https://github.com/inertiajs-revamped/inertia/commit/ac8db8b))
- update dependency qs to ^6.12.2 ([7c42673](https://github.com/inertiajs-revamped/inertia/commit/7c42673))

## 0.0.7 (2024-06-27)

### Code Refactoring

- move structured-clone to vue package ([e185cc9](https://github.com/inertiajs-revamped/inertia/commit/e185cc9))
- replace deepmerge with ts-deepmerge ([36f92e1](https://github.com/inertiajs-revamped/inertia/commit/36f92e1))

### Bug Fixes

- improve axios response types ([260c13b](https://github.com/inertiajs-revamped/inertia/commit/260c13b))

### Reverts

- revert check for axios error ([9d5fdb5](https://github.com/inertiajs-revamped/inertia/commit/9d5fdb5))
- fix deepmerge properties (based on [inertia/pull/1895](https://github.com/inertiajs/inertia/pull/1895)) ([c25e0f6](https://github.com/inertiajs-revamped/inertia/commit/c25e0f6))

### Builds

- update dependency @types/node to ^20.14.9 ([ec36814](https://github.com/inertiajs-revamped/inertia/commit/ec36814))
- update dependency @types/node to ^20.14.8 ([aff9dc4](https://github.com/inertiajs-revamped/inertia/commit/aff9dc4))
- update dependency @types/node to ^20.14.6 ([f4da004](https://github.com/inertiajs-revamped/inertia/commit/f4da004))
- update dependency @types/node to ^20.14.2 ([bdc0617](https://github.com/inertiajs-revamped/inertia/commit/bdc0617))

## 0.0.6 (2024-06-03)

### Bug Fixes

- check for window fixes vue ssr error ([900d17d](https://github.com/inertiajs-revamped/inertia/commit/900d17d))

### Builds

- update dependency @types/node to ^20.14.0 ([2340303](https://github.com/inertiajs-revamped/inertia/commit/2340303))
- update dependency axios to >=1.7.2 ([43d19ce](https://github.com/inertiajs-revamped/inertia/commit/43d19ce))
- update dependency axios to >=1.7.0 ([6146edf](https://github.com/inertiajs-revamped/inertia/commit/6146edf))

## 0.0.5 (2024-05-19)

### Features

- deepmerge properties, based on (inertia PR 1877) ([5021110](https://github.com/inertiajs-revamped/inertia/commit/5021110))
- exclude properties from partial responses, based on (inertia PR 1876) ([356b5e3](https://github.com/inertiajs-revamped/inertia/commit/356b5e3))

### Bug Fixes

- add window check to prevent ssr error ([66a19cc](https://github.com/inertiajs-revamped/inertia/commit/66a19cc))

### Builds

- update dependency @types/node to ^20.12.12 ([e3c265f](https://github.com/inertiajs-revamped/inertia/commit/e3c265f))

## 0.0.4 (2024-05-13)

### Features

- add structured-clone as deepclone replacement ([87ba19c](https://github.com/inertiajs-revamped/inertia/commit/87ba19c))

### Tests

- add `mergeDataIntoQueryString` test cases ([a731577](https://github.com/inertiajs-revamped/inertia/commit/a731577))

## 0.0.3 (2024-05-11)

### Code Refactoring

- replace `default` with named exports ([73fba92](https://github.com/inertiajs-revamped/inertia/commit/73fba92))

### Builds

- update dependency @types/node to ^20.12.11 ([96686b8](https://github.com/inertiajs-revamped/inertia/commit/96686b8))

## 0.0.2 (2024-05-02)

### Code Refactoring

- replace default with named export in progress.ts ([d57449d](https://github.com/inertiajs-revamped/inertia/commit/d57449d))
- replace default with named export in server.ts ([9af36a0](https://github.com/inertiajs-revamped/inertia/commit/9af36a0))
- export `debounce`, `hasFiles` & `objectToFormData` ([d235e8f](https://github.com/inertiajs-revamped/inertia/commit/d235e8f))

### Bug Fixes

- fix `peerDependencies` version ([94b9dec](https://github.com/inertiajs-revamped/inertia/commit/94b9dec))
- address history back button security issue (based on [inertia/pull/1784](https://github.com/inertiajs/inertia/pull/1784)) ([acb2f47](https://github.com/inertiajs-revamped/inertia/commit/acb2f47))
- fix type exports ([65de44e](https://github.com/inertiajs-revamped/inertia/commit/65de44e))

### Builds

- update dependency @types/node to ^20.12.8 ([2d1a120](https://github.com/inertiajs-revamped/inertia/commit/2d1a120))

## 0.0.1 (2024-04-26)

### Features

- add expand type helper ([c0ec541](https://github.com/inertiajs-revamped/inertia/commit/c0ec541))
- add helper function `resolvePageComponent` ([8f79da7](https://github.com/inertiajs-revamped/inertia/commit/8f79da7))

### Code Refactoring

- improve & export `progress` as standalone, excludes progress from bundle by default ([6e53be7](https://github.com/inertiajs-revamped/inertia/commit/6e53be7))
- make `PageResolver` generic, remove generic from `resolvePageComponent` ([1caf9da](https://github.com/inertiajs-revamped/inertia/commit/1caf9da))
- move `HeadManagerOnUpdate` & `HeadManagerTitleCallback` to core ([0faa792](https://github.com/inertiajs-revamped/inertia/commit/0faa792))
- improve `PageProps` to support module augmentation ([7e7b7dc](https://github.com/inertiajs-revamped/inertia/commit/7e7b7dc))

### Bug Fixes

- remove deprecated `element.type` in progress `injectCSS` ([eb6c5d4](https://github.com/inertiajs-revamped/inertia/commit/eb6c5d4))
- use `Omit` instead of `Exclude` in router types (based on [inertia/pull/1857](https://github.com/inertiajs/inertia/pull/1857)) ([f77d5e0](https://github.com/inertiajs-revamped/inertia/commit/f77d5e0))
- return early when using `router.on()` during ssr (based on [inertia/pull/1715](https://github.com/inertiajs/inertia/pull/1715)) ([7b8ae05](https://github.com/inertiajs-revamped/inertia/commit/7b8ae05))
- fix doubling hash in react `StrictMode` (based on [inertia/pull/1728](https://github.com/inertiajs/inertia/pull/1728)) ([ebcba61](https://github.com/inertiajs-revamped/inertia/commit/ebcba61))
- fix type definition typo ([b752ea3](https://github.com/inertiajs-revamped/inertia/commit/b752ea3))
- add type parameter `MouseEvent` for `shouldIntercept()`, fixes error in adapter `<Link>` ([be03560](https://github.com/inertiajs-revamped/inertia/commit/be03560))
- fix `<Router>` `onUploadProgress` to work with `Progress` type ([dc02443](https://github.com/inertiajs-revamped/inertia/commit/dc02443))
- fix `Progress` type & omit axios declaration, fixes ts(2322) in adapter `<Link>` ([8939bdd](https://github.com/inertiajs-revamped/inertia/commit/8939bdd))
- check for `undefined` `scopedErrors` in `Router`, fixes ts(2345) ([5660baf](https://github.com/inertiajs-revamped/inertia/commit/5660baf))
- replace deprecated `keyCode` in `modal.hideOnEscape()` ts(6385) ([fe63a1d](https://github.com/inertiajs-revamped/inertia/commit/fe63a1d))
- add `null` checks to `modal.hide()`, fixes ts(2769) ([c7d3654](https://github.com/inertiajs-revamped/inertia/commit/c7d3654))
- change modal `zIndex` value to be `string`, fixes ts(2322) ([9f2558b](https://github.com/inertiajs-revamped/inertia/commit/9f2558b))
- add interface for `modal`, fixes ts(2322) ([4db0d39](https://github.com/inertiajs-revamped/inertia/commit/4db0d39))
- add type export `HeadManger` & remove inline return type ([53567c4](https://github.com/inertiajs-revamped/inertia/commit/53567c4))
- add `Renderer` interface & `this` type parameter to `update()`, fixes multiple ts(2683) ([b56a407](https://github.com/inertiajs-revamped/inertia/commit/b56a407))
- check for `undefined` `dispatchRoute` in `createServer()`, fixes ts(2722) ([141f8be](https://github.com/inertiajs-revamped/inertia/commit/141f8be))
- add missing type exports for `AppCallback` & `RouteHandler` ([36e3d2b](https://github.com/inertiajs-revamped/inertia/commit/36e3d2b))
- fix qs, process wildcard & `node` imports to use named imports ([caf3cc8](https://github.com/inertiajs-revamped/inertia/commit/caf3cc8))
- add missing `this` type to `debounce()` callback, fixes ts(2683) ([378f140](https://github.com/inertiajs-revamped/inertia/commit/378f140))
- ensure that all imports used only as a type use a type-only `import` ([4321e7f](https://github.com/inertiajs-revamped/inertia/commit/4321e7f))

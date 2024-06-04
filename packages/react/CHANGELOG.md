# Changelog - @inertiajs-revamped/react

## 0.0.6 (2024-06-03)

### Builds

- update dependency @types/node to ^20.14.0 ([2340303](https://github.com/inertiajs-revamped/inertia/commit/2340303))
- update dependency @types/react to ^18.3.3 ([b344758](https://github.com/inertiajs-revamped/inertia/commit/b344758))

## 0.0.5 (2024-05-19)

### Features

- exclude properties from partial responses, based on (inertia PR 1876) ([69bbd5d](https://github.com/inertiajs-revamped/inertia/commit/69bbd5d))

### Builds

- update dependency @types/node to ^20.12.12 ([e3c265f](https://github.com/inertiajs-revamped/inertia/commit/e3c265f))

## 0.0.4 (2024-05-15)

### Features

- allow set processing to be set on react adaptors ([fe8e2c7](https://github.com/inertiajs-revamped/inertia/commit/fe8e2c7))

### Code Refactoring

- replace lodash.isequal with fast-equals ([6717177](https://github.com/inertiajs-revamped/inertia/commit/6717177))

## 0.0.3 (2024-05-11)

### Code Refactoring

- replace `default` with named exports ([fa860ed](https://github.com/inertiajs-revamped/inertia/commit/fa860ed))

### Bug Fixes

- fix `Link.onClick` event not fired ([29d158d](https://github.com/inertiajs-revamped/inertia/commit/29d158d))

### Builds

- update dependency @types/react to ^18.3.2 ([05c4a66](https://github.com/inertiajs-revamped/inertia/commit/05c4a66))
- update dependency @types/node to ^20.12.11 ([96686b8](https://github.com/inertiajs-revamped/inertia/commit/96686b8))
- update dependency react to >=18.3.1 ([be55995](https://github.com/inertiajs-revamped/inertia/commit/be55995))

## 0.0.2 (2024-05-02)

### Code Refactoring

- replace default with named export in progress.ts ([04ef2bc](https://github.com/inertiajs-revamped/inertia/commit/04ef2bc))
- replace default with named export in server.ts ([dbe7eac](https://github.com/inertiajs-revamped/inertia/commit/dbe7eac))

### Bug Fixes

- fix `peerDependencies` version ([7449bfa](https://github.com/inertiajs-revamped/inertia/commit/7449bfa))
- fix type exports ([08af4f3](https://github.com/inertiajs-revamped/inertia/commit/08af4f3))

### Builds

- update dependency @types/node to ^20.12.8 ([2d1a120](https://github.com/inertiajs-revamped/inertia/commit/2d1a120))

## 0.0.1 (2024-04-26)

### Features

- export function `resolvePageComponent` from core ([2c729c1](https://github.com/inertiajs-revamped/inertia/commit/2c729c1))
- add helper function `withLayout` ([9069717](https://github.com/inertiajs-revamped/inertia/commit/9069717))
- add aria-role for non anchor `<Link>` tags (based on [inertia/pull/1762](inertiajs/inertia#1762)) ([32ade50](https://github.com/inertiajs-revamped/inertia/commit/32ade50))
- check `as`, before convert to lowercase (based on [inertia/pull/1297](inertiajs/inertia#1297)) ([93d878f](https://github.com/inertiajs-revamped/inertia/commit/93d878f))

### Code Refactoring

- export `createProgress` from adapters, excludes progress from bundle by default ([d224363](https://github.com/inertiajs-revamped/inertia/commit/d224363))
- export `default as createServer` to avoid forcing `allowSyntheticDefaultImports` flag ([7f6544c](https://github.com/inertiajs-revamped/inertia/commit/7f6544c))
- replace typeof `renderToString`, removes react-dom from `peerDependencies` ([ad65d99](https://github.com/inertiajs-revamped/inertia/commit/ad65d99))
- replace type `ReactComponent` with `ReactNode` ([1a12eec](https://github.com/inertiajs-revamped/inertia/commit/1a12eec))
- replace misleading type `ReactInstance` with `ReactElement` ([36e9711](https://github.com/inertiajs-revamped/inertia/commit/36e9711))
- move `HeadManagerOnUpdate` & `HeadManagerTitleCallback` to core ([7c5c6a4](https://github.com/inertiajs-revamped/inertia/commit/7c5c6a4))
- improve `withLayout` types to work with module augmentation ([7bbc21e](https://github.com/inertiajs-revamped/inertia/commit/7bbc21e))
- improve & export `InertiaHeadProps` & `InertiaHead` types ([bdb1aab](https://github.com/inertiajs-revamped/inertia/commit/bdb1aab))
- remove deprecated `useRememberedState()` ([3dcc6d0](https://github.com/inertiajs-revamped/inertia/commit/3dcc6d0))

### Bug Fixes

- fix the remaining type errors ([22d3cb7](https://github.com/inertiajs-revamped/inertia/commit/22d3cb7))
- capitalize and make `PageContext` generic or `null`, force `usePage` return type explicit ([8d7ffbc](https://github.com/inertiajs-revamped/inertia/commit/8d7ffbc))
- capitalize and make `HeadContext` generic or `null`, fixes multiple ts(2769) ([c4bd85a](https://github.com/inertiajs-revamped/inertia/commit/c4bd85a))
- re-export all types from core package ([b88ee78](https://github.com/inertiajs-revamped/inertia/commit/b88ee78))
- add missing type `exports` for multiple un-exported types ([33a8fa9](https://github.com/inertiajs-revamped/inertia/commit/33a8fa9))
- check for `undefined` `render` in `createInertiaApp()`, fixes ts(2722) ([74016ed](https://github.com/inertiajs-revamped/inertia/commit/74016ed))
- add missing `resolveComponent` type in `createInertiaApp()`, fixes ts(7006) ([fa98f18](https://github.com/inertiajs-revamped/inertia/commit/fa98f18))
- add missing `head` type in `createInertiaApp()`, fixes multiple ts(7034) ([bb22517](https://github.com/inertiajs-revamped/inertia/commit/bb22517))
- change `key` initial value to `-1` in app.ts, fixes ts(2345) ([9756ab1](https://github.com/inertiajs-revamped/inertia/commit/9756ab1))
- memoize transform to fix `useForm()` bug (based on [inertia/pull/1718](inertiajs/inertia#1718)) ([8f9d987](https://github.com/inertiajs-revamped/inertia/commit/8f9d987))
- add missing generic for `useForm()` `cancelToken`, fixes multiple ts(2322) ([5861bec](https://github.com/inertiajs-revamped/inertia/commit/5861bec))
- add missing generic for `useForm()` `recentlySuccessfulTimeoutId`, fixes multiple ts(2769) ([786f413](https://github.com/inertiajs-revamped/inertia/commit/786f413))
- add missing `visit` parameter for `useForm().onFinish()`, fixes ts(2554) ([ae22230](https://github.com/inertiajs-revamped/inertia/commit/ae22230))
- add missing generic for `useForm()` `progress`, fixes ts(2345) ([9463079](https://github.com/inertiajs-revamped/inertia/commit/9463079))
- add missing types for `useForm()` submit callback parameters, fixes multiple ts(7006) ([dd75747](https://github.com/inertiajs-revamped/inertia/commit/dd75747))
- fix `useForm()` `isMounted` initial value to `false`, fixes ts(2322) ([121b2b2](https://github.com/inertiajs-revamped/inertia/commit/121b2b2))
- add type annotation to router, omits default-wildcard `core` import from d.ts bundle ([02ce58d](https://github.com/inertiajs-revamped/inertia/commit/02ce58d))
- add type annotation to explicitly specify the type of `<Link>`, omits default-wildcard `React` import from d.ts bundle ([bca76fa](https://github.com/inertiajs-revamped/inertia/commit/bca76fa))
- fix `onCancelToken` type in link.ts ([48d190a](https://github.com/inertiajs-revamped/inertia/commit/48d190a))
- add missing type `export` for `BaseInertiaLinkProps` ([7437f4f](https://github.com/inertiajs-revamped/inertia/commit/7437f4f))
- remove line breaks in link.ts warn, fixes minified bundle mess ([b0d20f9](https://github.com/inertiajs-revamped/inertia/commit/b0d20f9))
- use native events in link.ts to ensure compability with `instanceof`, fixes ts(7006) ([3184668](https://github.com/inertiajs-revamped/inertia/commit/3184668))
- remove useless rename of `default` export in server.ts ([b461fd2](https://github.com/inertiajs-revamped/inertia/commit/b461fd2))
- omit default-wildcard `React` import from `d.ts` bundle by removing all default `React` imports ([ed7de67](https://github.com/inertiajs-revamped/inertia/commit/ed7de67))
- replace default `React` imports with named imports in link.ts ([0899a77](https://github.com/inertiajs-revamped/inertia/commit/0899a77))
- replace default `React` import with named in head.ts ([b46e225](https://github.com/inertiajs-revamped/inertia/commit/b46e225))
- ensure that all imports used only as a type use a type-only `import` ([6ae2d05](https://github.com/inertiajs-revamped/inertia/commit/6ae2d05))

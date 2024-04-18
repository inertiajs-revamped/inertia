# Changelog - @inertiajs-revamped/core

## 0.1.0 (2024-04-18)

### Bug Fixes

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
# Changelog - @inertiajs-revamped/laravel

## 0.0.4 (2024-05-17)

### Features

- persistent properties, based on (inertia-laravel PR 621) ([d6e71d2](https://github.com/inertiajs-revamped/inertia/commit/d6e71d2))
- support dot notation in partial requests, based on (inertia-laravel PR 620) ([cdc761f](https://github.com/inertiajs-revamped/inertia/commit/cdc761f))
- add env variables for ssr options, based on (inertia-laravel PR 624) ([377297b](https://github.com/inertiajs-revamped/inertia/commit/377297b))

### Code Refactoring

- drop svelte support for now ([513ce61](https://github.com/inertiajs-revamped/inertia/commit/513ce61))

### Bug Fixes

- add symfony/console 6.0 support ([ec7ba0d](https://github.com/inertiajs-revamped/inertia/commit/ec7ba0d))
- fix unexpected json resource serialization, based on (inertia-laravel PR 619) ([5f57f8a](https://github.com/inertiajs-revamped/inertia/commit/5f57f8a))
- ensure query string not url encoded, based on (inertia-laravel PR 598) ([6b94bb5](https://github.com/inertiajs-revamped/inertia/commit/6b94bb5))
- make commands lazy, based on (inertia-laravel PR 601) ([b2ff0df](https://github.com/inertiajs-revamped/inertia/commit/b2ff0df))
- fix mockery version ([70be88e](https://github.com/inertiajs-revamped/inertia/commit/70be88e))

### Builds

- add dependency symfony/console ([2cde480](https://github.com/inertiajs-revamped/inertia/commit/2cde480))

## 0.0.3 (2024-05-12)

### Bug Fixes

- restore phpunit v9.5.8 compability ([4e21e8e](https://github.com/inertiajs-revamped/inertia/commit/4e21e8e))

## 0.0.2 (2024-05-10)

### Code Refactoring

- improve directory structure ([af18ac8](https://github.com/inertiajs-revamped/inertia/commit/af18ac8))

### Bug Fixes

- add `$request->inertia()` ide helper, based on [inertia-laravel/pull/496](https://github.com/inertiajs/inertia-laravel/pull/496) ([a68f2e4](https://github.com/inertiajs-revamped/inertia/commit/a68f2e4))

### Builds

- drop unsupported testbench & phpunit versions ([e5829ad](https://github.com/inertiajs-revamped/inertia/commit/e5829ad))
- update dependency mockery/mockery to v1.6.11 ([cfaa11b](https://github.com/inertiajs-revamped/inertia/commit/cfaa11b))
- update dependency phpunit/phpunit to v10.5 ([5bd2ab6](https://github.com/inertiajs-revamped/inertia/commit/5bd2ab6))

### Tests

- fix type errors in response test ([ae37878](https://github.com/inertiajs-revamped/inertia/commit/ae37878))

## 0.0.1 (2024-04-18)

### Code Refactoring

- change default resources_path to `views/pages` ([b420492](https://github.com/inertiajs-revamped/inertia/commit/b420492))
- drop php 7.3 & 8.0 support ([d1f4dda](https://github.com/inertiajs-revamped/inertia/commit/d1f4dda))
- drop laravel 8.x support ([57aa760](https://github.com/inertiajs-revamped/inertia/commit/57aa760))

### Styles

- fix config formatting ([a80dc79](https://github.com/inertiajs-revamped/inertia/commit/a80dc79))

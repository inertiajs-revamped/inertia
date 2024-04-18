# Inertia.js-Revamped

> A framework for creating server-driven single page apps

## Introduction

### Overview

The article [Server-side apps with client-side rendering](https://reinink.ca/articles/server-side-apps-with-client-side-rendering), which Jonathan Reinink published on his blog in 2019 looked very promising as an alternative to [spatie/laravel-server-side-rendering](https://github.com/spatie/laravel-server-side-rendering).  
When [Inertia.js](https://inertiajs.com/) was subsequently released, it looked like the next rising star.

However, due to the lack of development, unanswered issues and rejected pull requests at [Inertia.js](https://github.com/inertiajs/inertia), we decided to continue developing a fork under the name `Inertia.js-Revamped`.

### Current Roadmap

Application related:

* __Improve TypeScript support__ - Provide better type definitions for IDE and autocomplete
* __Improve application performance__ - Optimize the application performance and reduce required dependencies
* __Expand the test suites__ - Add test suites for better code control

Community related:

* __Improve user & developer experience__ - Optimize the docs, examples, starter-kits, workspace- and user-tools continuously
* __Collaborate with community members__ - Issue prioritization will be based on community feedback, please [share your thoughts](https://github.com/inertiajs-revamped/inertia/issues)

## Documentation

View the docs (currently in development) at [inertiajs-revamped.com](https://inertiajs-revamped.com).

### Directory Structure

Inertia.js-Revamped is using [Laravel Vite conventions](https://laravel-vite.dev/guide/extra-topics/inertia.html#conventions) for a consistent and organized architecture:

```text
example-app
└── resources
    ├── application
    │   ├── app.css    
    │   ├── main.tsx
    │   └── ssr.tsx
    ├── types
    │   └── inertia.d.ts
    └── views
        ├── components
        │   └── button.tsx
        ├── layouts
        │   └── default.tsx
        ├── pages
        │   ├── about.tsx
        │   └── home.tsx
        └── app.blade.php
```

### Rundown

* File and directory names use `kebab-case` instead of `StudlyCase`
* The `app.blade.php` is stored in `resources/views`
* Main entrypoint is `resources/application/main.{ts,tsx,js,jsx}`
* SSR entrypoint is `resources/application/ssr.{ts,tsx,js,jsx}`
* Pages are stored in `resources/views/pages`
* Components are stored in `resources/views/components`
* Layouts are stored in `resources/views/layouts`
* Types are stored in `resources/types`

## Changelog

Temporary changelogs for the forked/migrated packages can be found in the root [CHANGELOG.md](https://github.com/inertiajs-revamped/inertia/tree/main/CHANGELOG.md).

## Contributing

### Contributing Guidelines

Please read our [CONTRIBUTING](https://github.com/inertiajs-revamped/inertia/blob/main/CONTRIBUTING.md) guide and [CODE OF CONDUCT](https://github.com/inertiajs-revamped/inertia/blob/main/CODE_OF_CONDUCT.md) for more information.

### Contributors ✨

<a href="https://github.com/inertiajs-revamped/inertia/graphs/contributors"><img src="https://raw.githubusercontent.com/inertiajs-revamped/inertia/main/.github/assets/CONTRIBUTORS.svg" alt="Contributors" /></a>

## License

Licensed under the [MIT license](https://github.com/inertiajs-revamped/inertia/blob/main/LICENSE).

### Credits

This project is based on [Inertia.js](https://inertiajs.com/) by [Jonathan Reinink](https://reinink.ca/). Read the [CREDITS](https://github.com/inertiajs-revamped/inertia/blob/main/CREDITS.md).

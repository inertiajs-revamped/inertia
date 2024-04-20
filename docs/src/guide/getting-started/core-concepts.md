# Core Concepts

## Directory Structure

Inertia.js-Revamped is using [Laravel Vite conventions](https://github.com/innocenzi/laravel-vite/blob/main/docs/src/guide/extra-topics/inertia.md#conventions) for a consistent and organized architecture:

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

## Rundown

* File and directory names use `kebab-case` instead of `StudlyCase`
* The `app.blade.php` is stored in `resources/views`
* Main entrypoint is `resources/application/main.{ts,tsx,js,jsx}`
* SSR entrypoint is `resources/application/ssr.{ts,tsx,js,jsx}`
* Pages are stored in `resources/views/pages`
* Components are stored in `resources/views/components`
* Layouts are stored in `resources/views/layouts`
* Types are stored in `resources/types`

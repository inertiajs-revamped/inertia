# Project Structure

Inertia.js-Revamped follows the convention below for a consistent and organized architecture.

## Directories and Files

* File and directory names use `kebab-case` instead of `StudlyCase`.
* Root blade template is stored in `resources/application/app.blade.php`.
* Main entry point is `resources/application/main.{ts,tsx,js,jsx}`.
* SSR entry point is `resources/application/ssr.{ts,tsx,js,jsx}`.
* Pages are stored in `resources/views/pages`.
* Components are stored in `resources/views/components`.
* Layouts are stored in `resources/views/layouts`.
* Types are stored in `resources/types`.

## Example Project Tree

A typical Inertia.js-Revamped project directory might look like this:

```text
example-app/
└── resources/
    ├── application/
    │   ├── app.blade.php
    │   ├── app.css
    │   ├── main.tsx
    │   └── ssr.tsx
    ├── types/
    │   └── inertia-{ui}.d.ts
    └── views/
        ├── components/
        │   └── button.tsx
        ├── layouts/
        │   └── default.tsx
        └── pages/
            ├── about.tsx
            └── home.tsx
```

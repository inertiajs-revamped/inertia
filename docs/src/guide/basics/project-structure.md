# Project Structure

Inertia.js-Revamped follows the convention below for a consistent and organized architecture.

## Directories and Files

* File and directory names use `kebab-case` instead of `StudlyCase`.
* Root blade template is stored in `resources/views/app.blade.php`.
* Main entry point is `resources/application/main.{ts,tsx,js,jsx}`.
* SSR entry point is `resources/application/ssr.{ts,tsx,js,jsx}`.
* Components are stored in `resources/components`.
* Layouts are stored in `resources/layouts`.
* Pages are stored in `resources/pages`.
* Types are stored in `resources/types`.

## Example Project Tree

A typical Inertia.js-Revamped project directory might look like this:

```text
example-app/
└── resources/
    ├── application/
    │   ├── app.css
    │   ├── main.tsx
    │   └── ssr.tsx
    ├── components/
    │   ├── button.tsx
    │   └── drop-down.tsx
    ├── layouts/
    │   ├── auth-layout.tsx
    │   └── guest-layout.tsx
    ├── pages/
    │   ├── about.tsx
    │   └── home.tsx
    ├── types/
    │   └── inertia-{ui}.d.ts
    └── views/
        └── app.blade.php
```

# Project Structure

## Overview

We follow the convention below for a consistent and organized project architecture.

> [!NOTE]
> This project structure is a common convention but not required.

## Directories and Files

- `public/*` - Static assets & compiled source (fonts, icons, etc.).
- `resources/*` - The frontend source code files.
- `package.json` - The Project manifest.
- `tsconfig.json` - The TypeScript configuration file.
- `vite.config.ts` - The Vite configuration file.

### `resources/`

The `resources` directory contains most of a projects source code:

- `application/` - The entry point files to load application specific environment.
- `components/` - The application components.
- `layouts/` - The application layouts.
- `pages/` - The application pages.
- `types/` - The application TypeScript interfaces or types.
- `views/` - The default `app.blade.php` template and other Blade templates.

## Example Project Tree

> [!TIP]
> Use our preset [starter kit](/guide/getting-started/quick-start) to scaffold a new Inertia.js-Revamped project in a second.

The recommended structure for a typical Inertia.js-Revamped project is as follows:

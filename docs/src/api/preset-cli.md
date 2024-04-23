# Preset CLI

## Overview

To offer the best user experience we use [@preset/cli](https://preset.dev) to scaffold our [starter-kits](https://github.com/inertiajs-revamped/inertia/tree/main/packages/presets).

> [Preset](https://preset.dev/) is a system that makes it easy to perform modifications on a freshly scaffolded project.

They are hosted on our GitHub [repository](https://github.com/inertiajs-revamped/inertia) and can be applied by providing an additional command line argument `--ui` using `npx`.

## Requirements

When using automatic setup, Inertia.js-Revamped has a few requirements:

* [Node.js](https://nodejs.org/en/) >= 18.12.0
* [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
* [Composer](https://getcomposer.org/) >= 2.4.4
* [Laravel](https://laravel.com/) >= 9.x

## Usage

To install Inertia.js-Revamped in a fresh Laravel application, run the commands:

::: code-group

``` [Preact]
composer create-project laravel/laravel <project-name>
cd <project-name>
npx @preset/cli apply inertiajs-revamped/inertia --ui=preact // [!code focus]
```

``` [React]
composer create-project laravel/laravel <project-name>
cd <project-name>
npx @preset/cli apply inertiajs-revamped/inertia --ui=react // [!code focus]
```

``` [Vue]
composer create-project laravel/laravel <project-name>
cd <project-name>
npx @preset/cli apply inertiajs-revamped/inertia --ui=vue // [!code focus]
```

:::

## Options

| Option | Description |
| -      | -           |
| `--ui [framework]` | Prefered UI-Framework (default: `none`) (`"preact" \| "react" \| "vue"`) |
| `--no-typescript`  | Disable TypeScript (use `.jsx`) (default: `false`) (`boolean`) |
| `--no-ssr`         | Disable SSR (default: `false`) (`boolean`) |
| `--sandbox`        | For development [workspace](https://github.com/inertiajs-revamped/inertia) only (default: `false`) (`boolean`) |

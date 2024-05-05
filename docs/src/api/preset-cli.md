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

```sh [composer]
composer create-project laravel/laravel <project-name>
cd <project-name>
```

::: code-group

```sh [npm]
npx @preset/cli apply inertiajs-revamped/inertia
```

```sh [pnpm]
pnpm dlx @preset/cli apply inertiajs-revamped/inertia
```

```sh [yarn]
yarn add @preset/cli apply inertiajs-revamped/inertia
```

```sh [bun]
bunx @preset/cli apply inertiajs-revamped/inertia
```

:::

This command will install and execute Inertia.js-Revamped `@preset/cli`. You will be presented with prompts for several optional features such as TypeScript and SSR support:

```sh
 OK  Applied Inertia.js-Revamped.

  ✓  Executed action: Choose your package manager › pnpm
  ✓  Executed action: Choose your UI framework › react
  ✓  Executed action: Choose your variant › ts
  ✓  Executed action: Choose to enable/disable SSR › enabled
  ✓  Executed action: Installing PHP dependencies with Composer (php)
  ✓  Executed action: Installing Inertia.js-Revamped Scaffolding (7 actions)
  ✓  Executed action: Cleaning Up Files & Content (2 actions)
  ✓  Executed action: Installing Node.js Dependencies (3 actions)

 Presets  1 applied
 Actions  20 executed
 Duration  14.85s

 NEXT STEPS

  ➜  Run the development server with npm run dev
  ➜  Edit your entry points in resources/application
  ➜  Edit your layouts and pages in resources/views
```

## Options

| Option | Description |
| -      | -           |
| `--packageManager [manager]` | Package manager (default: `npm`) (`"npm" \| "pnpm" \| "yarn" \| "bun"`) |
| `--ui [framework]` | UI-Framework (default: `none`) (`"preact" \| "react" \| "vue"`) |
| `--no-typescript`  | Disable TypeScript (use `.jsx`) (default: `false`) (`boolean`) |
| `--no-ssr`         | Disable SSR (default: `false`) (`boolean`) |
| `--sandbox`        | For development [workspace](https://github.com/inertiajs-revamped/inertia) only (default: `false`) (`boolean`) |

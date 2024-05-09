# Quick Start

The recommended way of scaffolding a new Inertia.js-Revamped project is via automatic setup using our [@preset/cli](https://preset.dev) starter-kits.

> [!IMPORTANT]
> Inertia.js-Revamped is currently in `alpha` status and not ready for production use yet.

---

> [!TIP] Prefer to install Inertia.js-Revamped manually?
> Read our step-by-step manual [installation guide](/guide/integrations/laravel/installation) instead.

## Prerequisites

When using automatic setup, Inertia.js-Revamped has a few requirements:

* [Node.js](https://nodejs.org/en/) >= 18.12.0
* [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
* [Composer](https://getcomposer.org/) >= 2.4.4
* [Laravel](https://laravel.com/) >= 9.x

## Scaffolding a new project

To install Inertia.js-Revamped in a [fresh Laravel](https://laravel.com/docs/11.x/installation) application, run the commands:

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

> [!TIP]
> You can also directly specify `options` as command line arguments. Learn more about the [API](/api/preset-cli#options).

## Usage

Run the [Vite dev server](https://vitejs.dev/config/server-options.html) with the command:

```sh
npm run dev

VITE v5.2.9  ready in 1487 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

Build the app with production-ready assets with the command:

```sh
npm run build

vite v5.2.9 building for production...
✓ 4 modules transformed.
```

Locally preview the production build with the command:

```sh
npm run preview

➜  Local:   http://localhost:4173/
➜  Network: use --host to expose
```

## What's next?

* To learn about our [project structure](/guide/basics/project-structure) convention, read the basics.
* To learn more about our starter kits, read [Preset CLI](/api/preset-cli).

::: tip

<ins>Your contributions are welcome!</ins> Please read our [contributing guide](https://github.com/inertiajs-revamped/inertia/blob/main/CONTRIBUTING.md) for more information.

:::

### Community

If you have a question or need additional help, please consider to join our [Discord](https://discord.gg/Hn5bDDvTKX) or start a discussion at [GitHub](https://github.com/inertiajs-revamped/inertia/discussions).

Please use the GitHub [issue tracker](https://github.com/inertiajs-revamped/inertia/issues) to submit bug reports and feature requests.

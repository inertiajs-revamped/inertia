# Quick Start

The recommended way of scaffolding a new Inertia.js-Revamped project is via automatic setup using our [@preset/cli](https://preset.dev) starter-kits.

::: info
Inertia.js-Revamped is currently in `alpha` status and not ready for production use yet.
:::

## Requirements

When using automatic setup, Inertia.js-Revamped has a few requirements:

* [Node.js](https://nodejs.org/en/) >= 18.12.0
* [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
* [Composer](https://getcomposer.org/) >= 2.4.4
* [Laravel](https://laravel.com/) >= 9.x

## Automatic setup using `@preset/cli`

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

By default preset installs Inertia.js-Revamped, a UI framework of your choice, configures [Vite](https://vitejs.dev) with [TypeScript](https://www.typescriptlang.org/) and enables SSR.

::: info

* TypeScript variant can be disabled by passing the `--no-typescript` flag.
* SSR can be disabled by passing the `--no-ssr` flag.

:::

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

* To learn about a projects structure, read more about the [core concepts](/guide/getting-started/core-concepts).
* To learn more about the our starter-kits read [Preset CLI](/api/preset-cli).

::: tip

<ins>Your contributions are welcome!</ins> Please read our [contributing guide](https://github.com/inertiajs-revamped/inertia/blob/main/CONTRIBUTING.md) for more information.

:::

### Community

If you have a question or need additional help, please consider to join our [Discord](https://discord.gg/Hn5bDDvTKX) or start a discussion at [Github](https://github.com/inertiajs-revamped/inertia/discussions).

Please use the GitHub [issue tracker](https://github.com/inertiajs-revamped/inertia/issues) to submit bug reports and feature requests.

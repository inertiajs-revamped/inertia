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
  ➜  Edit your pages in resources/pages
```

> [!TIP]
> You can also directly specify `options` as command line arguments. Learn more about the [API](/api/preset-cli#options).

## Usage

### Serving Laravel

To learn more about how to serve your Laravel application, read Laravel [installation](https://laravel.com/docs/4.2/quick#installation).

> Typically, you may use a web server such as Apache or Nginx to serve your Laravel applications. If you ... would like to use PHP's built-in development server, you may use the serve Artisan command:

```sh
php artisan serve
```

> By default the HTTP-server will listen to port 8000.

### Start the development server

Run the [Vite dev server](https://vitejs.dev/config/server-options.html) with the command:

::: code-group

```sh [npm]
npm run dev
```

```sh [pnpm]
pnpm run dev
```

```sh [yarn]
yarn run dev
```

```sh [bun]
bun run dev
```

:::

```sh
# outputs
VITE v5.2.9  ready in 1487 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

### Deploy

To learn more about how to deploy your application, read Laravel [deployment](https://laravel.com/docs/11.x/deployment).

### Bundle with Vite

Build the app with production-ready assets with the command:

::: code-group

```sh [npm]
npm run build:prod
```

```sh [pnpm]
pnpm run build:prod
```

```sh [yarn]
yarn run build:prod
```

```sh [bun]
bun run build:prod
```

:::

```sh
# outputs
vite v5.2.9 building for production...
✓ 4 modules transformed.
```

### Server-side Rendering (SSR)

Server-side rendering uses [Node.js](https://nodejs.org/en/) to render your pages in a background process; therefore, Node must be available on your server for server-side rendering to function properly.

```sh
php artisan inertia:start-ssr
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

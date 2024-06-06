# Quick Start

We recommend scaffolding Inertia.js-Revamped via automatic CLI installer [@preset/cli](https://preset.dev).

<!--@include: ../../_templates/parts/alpha-status.md-->

## Prerequisites

Ensure that your environment meets the minimum installation requirements:

* [Node.js](https://nodejs.org/en/) >= 18.12.0
* [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
* [Composer](https://getcomposer.org/) >= 2.4.4
* [Laravel](https://laravel.com/) >= 9.x

## Scaffolding a new project

To install Inertia.js-Revamped in a [fresh Laravel](https://laravel.com/docs/11.x/installation) application, setup a new laravel project:

```shell [composer]
composer create-project laravel/laravel <project-name>
cd <project-name>
```

Running the following command you'll be prompted to select your project configuration:

::: details Click to expand available command line arguments

* You can directly specify command line arguments.

| Option | Description |
| -      | -           |
| `--packageManager`   | Package manager (default: `npm`) (`"npm" \| "pnpm" \| "yarn" \| "bun"`) |
| `--ui`               | UI-Framework (default: `undefined`) (`"preact" \| "react" \| "vue"`) |
| `--template`         | Template (default: `default`) (`"default" \| "breeze" \| "pingcrm"`) |
| `--no-ssr`           | Disable SSR (default: `false`) (`boolean`) |
| `--sandbox`          | For development [workspace](https://github.com/inertiajs-revamped/inertia) only (default: `false`) (`boolean`) |

:::

::: code-group

```shell [npm]
npx @preset/cli apply inertiajs-revamped/inertia
```

```shell [pnpm]
pnpm dlx @preset/cli apply inertiajs-revamped/inertia
```

```shell [yarn]
yarn add @preset/cli apply inertiajs-revamped/inertia
```

```shell [bun]
bunx @preset/cli apply inertiajs-revamped/inertia
```

:::

::: tip Example output:

```shell
 OK  Applied Inertia.js-Revamped.

  ✓  Executed action: Choose your package manager › pnpm
  ✓  Executed action: Choose your UI framework › react
  ✓  Executed action: Choose your starter template › breeze
  ✓  Executed action: Choose to enable/disable SSR › enabled
  ✓  Executed action: Installing PHP dependencies with Composer (php)
  ✓  Executed action: Installing Breeze Scaffolding (15 actions)

 Presets  1 applied
 Actions  21 executed
Duration  21.55s

 NEXT STEPS

  ➜  Run the development server with npm run dev
  ➜  Edit your entry points in resources/application
  ➜  Edit your pages in resources/pages
```

:::

## Usage

### Serving Laravel

To learn more about how to serve your Laravel application, read Laravel [installation](https://laravel.com/docs/11.x/installation).

> Typically, you may use a web server such as Apache or Nginx to serve your Laravel applications. If you ... would like to use PHP's built-in development server, you may use the serve Artisan command:

```shell
php artisan serve
```

> By default the HTTP-server will listen to port 8000.

### Start the development server

Run the [Vite dev server](https://vitejs.dev/config/server-options.html) with the command:

::: code-group

```shell [npm]
npm run dev
```

```shell [pnpm]
pnpm run dev
```

```shell [yarn]
yarn run dev
```

```shell [bun]
bun run dev
```

:::

```shell
# outputs
VITE v5.2.12  ready in 148 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help

LARAVEL v11.9.1  plugin v1.0.4

➜  APP_URL: http://localhost
```

### Deploy

To learn more about how to deploy your application, read Laravel [deployment](https://laravel.com/docs/11.x/deployment).

### Bundle with Vite

Build the app with production-ready assets with the command:

::: code-group

```shell [npm]
npm run build:prod
```

```shell [pnpm]
pnpm run build:prod
```

```shell [yarn]
yarn run build:prod
```

```shell [bun]
bun run build:prod
```

:::

```shell
# outputs
vite v5.2.12 building for production...
✓ 173 modules transformed.
public/build/manifest.json                         6.77 kB │ gzip:  0.83 kB
public/build/assets/main-COAaD1bI.css             18.35 kB │ gzip:  4.54 kB
# ...
public/build/assets/main-CkXGnkYC.js             252.00 kB │ gzip: 83.96 kB
✓ built in 1.40s
vite v5.2.12 building SSR bundle for production...
✓ 29 modules transformed.
bootstrap/ssr/ssr-manifest.json                    2.48 kB
bootstrap/ssr/assets/index-VzRQPh_D.js             0.51 kB
# ...
bootstrap/ssr/assets/layout-C6sDMM8X.js           16.57 kB
✓ built in 344ms
```

### Server-side Rendering (SSR)

Server-side rendering uses [Node.js](https://nodejs.org/en/) to render your pages in a background process; therefore, Node must be available on your server for server-side rendering to function properly.

```shell
# start the ssr server
php artisan inertia:start-ssr

# stop the ssr server
php artisan inertia:stop-ssr
```

## What's next?

<!--@include: ../../_templates/parts/contributors.md-->

<!--@include: ../../_templates/parts/community.md-->

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# Laravel Server-side Setup

> This guide assumes you've already read the [Project Structure Basics](../basics/project-structure).

This document will guide you through the setup of the [Laravel](https://laravel.com/) adapter.

## Installation

Install the Inertia.js-Revamped server-side adapter using the [Composer](https://getcomposer.org/) package manager.

```shell
composer require inertiajs-revamped/laravel
```

> The package will automatically register a service provider.

### Setup Middleware

Next, install the middleware.

```shell
php artisan inertia:middleware
```

Once the middleware has been published, append the `HandleInertiaRequests` middleware to the web middleware group in your application's `bootstrap/app.php` file.

::: code-group

```php [bootstrap/app.php]
use App\Http\Middleware\HandleInertiaRequests; // [!code ++]

->withMiddleware(function (Middleware $middleware) {
  $middleware->web(append: [ // [!code ++]
    HandleInertiaRequests::class, // [!code ++]
  ]); // [!code ++]
})
```

:::

### Publish Config

```shell
php artisan vendor:publish --provider="Inertia\ServiceProvider"
```

## Create `app.blade.php`

Proceed to delete `resources/views`, and create `resources/views/app.blade.php`.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @vite('resources/application/main.tsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

  </template>
  <template #react>

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @viteReactRefresh
    @vite('resources/application/main.tsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

  </template>
  <template #vue>

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @vite('resources/application/main.ts')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

  </template>
</AdapterWrapper>

## Server-side Rendering (SSR)

Server-side rendering uses [Node.js](https://nodejs.org/en/) to render your pages in a background process; therefore, Node must be available on your server for server-side rendering to function properly.

```shell
# start the ssr server
php artisan inertia:start-ssr

# stop the ssr server
php artisan inertia:stop-ssr
```

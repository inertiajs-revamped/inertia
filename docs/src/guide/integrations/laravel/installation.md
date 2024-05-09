---
next: 'Preact - Installation'
---

# Laravel Server-side Setup

> [!NOTE]
> This document is a work in progress.

## Install Dependencies

Install the Inertia.js-Revamped server-side adapter using the [Composer](https://getcomposer.org/) package manager.

```sh
composer require inertiajs-revamped/laravel
```

> The package will automatically register a service provider.

### Setup Middleware

Next, install the middleware.

```sh
php artisan inertia:middleware
```

Once the middleware has been published, append the `HandleInertiaRequests` middleware to the web middleware group in your application's `bootstrap/app.php` file.

```php
use App\Http\Middleware\HandleInertiaRequests;

->withMiddleware(function (Middleware $middleware) {
  $middleware->web(append: [
    HandleInertiaRequests::class,
  ]);
})
```

### Publish Config

```sh
php artisan vendor:publish --provider="Inertia\ServiceProvider"
```

## Create `app.blade.php`

Proceed to delete `resources/views`, and create `resources/views/app.blade.php`.

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @viteReactRefresh <!-- React only, remove if Preact/Vue -->
    @vite('resources/application/main.{ts,tsx,js,jsx}')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

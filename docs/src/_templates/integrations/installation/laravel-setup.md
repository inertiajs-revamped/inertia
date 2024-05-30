# Laravel Server-side Setup

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

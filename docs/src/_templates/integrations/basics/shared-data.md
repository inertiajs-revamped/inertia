# Shared data

Sometimes you need to access specific pieces of data on numerous pages within your application. For example, you may need to display the current user in the site header. Passing this data manually in each response across your entire application is cumbersome. Thankfully, there is a better option: shared data.

## Sharing data

Inertia's server-side adapters all provide a method of making shared data available for every request. This is typically done outside of your controllers. Shared data will be automatically merged with the page props provided in your controller.

In Laravel applications, this is typically handled by the `HandleInertiaRequests` middleware that is automatically installed when installing the server-side adapter.

```php
class HandleInertiaRequests extends Middleware
{
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            // Synchronously...
            'appName' => config('app.name'),

            // Lazily...
            'auth.user' => fn () => $request->user()
                ? $request->user()->only('id', 'name', 'email')
                : null,
        ]);
    }
}
```

> [!TIP]
> The HandleInertiaRequests middleware provides a "share" method where you can define the data that is automatically shared with each Inertia response.

Alternatively, you can manually share data using the Inertia::share method.

```php
use Inertia\Inertia;

// Synchronously...
Inertia::share('appName', config('app.name'));

// Lazily...
Inertia::share('user', fn (Request $request) => $request->user()
    ? $request->user()->only('id', 'name', 'email')
    : null
);
```

> [!WARNING]
> Shared data should be used sparingly as all shared data is included with every response.
> Page props and shared data are merged together, so be sure to namespace your shared data appropriately to avoid collisions.
>
## Accessing shared data

Once you have shared the data server-side, you will be able to access it within any of your pages or components. Here's an example of how to access shared data in a layout component.

```ts
import { usePage, type LayoutProps } from '@inertiajs-revamped/preact'

export default function Layout({ children }: LayoutProps) {
  const { auth } = usePage().props

  return (
    <main>
      <header>
        You are logged in as: {auth.user.name}
      </header>
      <content>
        {children}
      </content>
    </main>
  )
}
```

## Flash messages

Another great use-case for shared data is flash messages. These are messages stored in the session only for the next request. For example, it's common to set a flash message after completing a task and before redirecting to a different page.

Here's a simple way to implement flash messages in your Inertia applications. First, share the flash message on each request.

```php
class HandleInertiaRequests extends Middleware
{
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ]);
    }
}
```

Next, display the flash message in a frontend component, such as the site layout.

```ts
import { usePage, type LayoutProps } from '@inertiajs-revamped/preact'

export default function Layout({ children }: LayoutProps) {
  const { flash } = usePage().props

  return (
    <main>
      <header></header>
      <content>
        {flash.message && (
          <div class="alert">{flash.message}</div>
        )}
        {children}
      </content>
      <footer></footer>
    </main>
  )
}
```

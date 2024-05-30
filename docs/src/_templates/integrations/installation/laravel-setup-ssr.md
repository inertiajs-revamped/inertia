## Server-side Rendering (SSR)

Server-side rendering uses [Node.js](https://nodejs.org/en/) to render your pages in a background process; therefore, Node must be available on your server for server-side rendering to function properly.

```shell
# start the ssr server
php artisan inertia:start-ssr

# stop the ssr server
php artisan inertia:stop-ssr
```

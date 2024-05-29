<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-gray-100">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#F1F5F9" />
    <meta name="referrer" content="origin-when-cross-origin" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/pwa/icon-192x192.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title inertia>{{ config('app.name', 'PingCRM') }}</title>
    @vite('resources/application/main.ts')
    @inertiaHead
  </head>

  <body class="font-sans leading-none text-gray-700 antialiased">
    @inertia
  </body>

</html>

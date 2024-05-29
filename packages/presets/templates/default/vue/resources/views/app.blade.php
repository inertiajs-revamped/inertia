<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="data:,">
    @vite('resources/application/main.ts')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>

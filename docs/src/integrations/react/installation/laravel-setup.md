<!--@include: ../../../_templates/integrations/installation/laravel-setup.md-->

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
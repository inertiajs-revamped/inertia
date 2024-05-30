<!--@include: ../../../_templates/integrations/installation/laravel-setup.md-->

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

<!--@include: ../../../_templates/integrations/installation/laravel-setup-ssr.md-->

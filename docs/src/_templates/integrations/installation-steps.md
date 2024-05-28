<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegrations } from '@/theme/composables/useIntegrations'
const integrations = useIntegrations()
const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = integrations.filter((pkg) => pkg.name === urlParts[1])[0]
</script>

# @inertiajs-revamped/{{ adapter.name }}

> {{ adapter.description }}

::: stepper Ensure that all requirements are met

- [Node.js](https://nodejs.org/en/) >= 18.12.0
- [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
- [Composer](https://getcomposer.org/) >= 2.4.4
- [Laravel](https://laravel.com/) >= 9.x

```sh [composer]
composer create-project laravel/laravel <project-name>
cd <project-name>
```

:::

::: stepper Install the Laravel & Preact Adapter in your Laravel project
<Card name="laravel" version="0.0.4" />

<Card :name="adapter.name" :description="adapter.description" :version="adapter.version" />

Choose [laravel/breeze](https://github.com/laravel/breeze) (modified fork) or our `default` template as starter template.

::: code-group

```sh [npm]
npx @preset/cli apply inertiajs-revamped/inertia
```

```sh [pnpm]
pnpm dlx @preset/cli apply inertiajs-revamped/inertia
```

```sh [yarn]
yarn add @preset/cli apply inertiajs-revamped/inertia
```

```sh [bun]
bunx @preset/cli apply inertiajs-revamped/inertia
```

:::

:::: stepper Start the development server

::: code-group

```sh [npm]
npm run dev
```

```sh [pnpm]
pnpm run dev
```

```sh [yarn]
yarn run dev
```

```sh [bun]
bun run dev
```

:::

::::

::: stepper Enjoy
:::

---
title: Adapter
aside: false
---

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
const laravelAdapter = useIntegration('laravel')
</script>

# @inertiajs-revamped/{{ adapter.name }}

> {{ adapter.description }}

:::: stepper Ensure that all requirements are met

- [Node.js](https://nodejs.org/en/) >= 18.12.0
- [PHP](https://www.php.net/manual/de/intro-whatis.php) >= 8.1
- [Composer](https://getcomposer.org/) >= 2.4.4
- [Laravel](https://laravel.com/) >= 9.x

::: code-group

```shell [composer]
composer create-project laravel/laravel <project-name>
cd <project-name>
```

:::

::::

::: stepper Install the Laravel & {{ adapter.title }} Adapter in your Laravel project

<Card v-bind="laravelAdapter" />

<Card v-bind="adapter" />

Running the following command you'll be prompted to select your project configuration:

::: code-group

```shell [npm]
npx @preset/cli apply inertiajs-revamped/inertia
```

```shell [pnpm]
pnpm dlx @preset/cli apply inertiajs-revamped/inertia
```

```shell [yarn]
yarn add @preset/cli apply inertiajs-revamped/inertia
```

```shell [bun]
bunx @preset/cli apply inertiajs-revamped/inertia
```

:::

:::: stepper Start the development server

::: code-group

```shell [npm]
npm run dev
```

```shell [pnpm]
pnpm run dev
```

```shell [yarn]
yarn run dev
```

```shell [bun]
bun run dev
```

:::

::::

::: stepper Enjoy
:::

<!--@include: ../../_templates/parts/manual-installation.md-->

<!--@include: ../../_templates/parts/whats-next.md-->

<!--@include: ../../_templates/parts/community.md-->

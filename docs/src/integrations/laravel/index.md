---
title: Adapter
aside: false
---

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { useIntegration, useIntegrations } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const integrations = useIntegrations()
const adapters = computed(
    () => integrations.filter((int) => int.name !== 'laravel')
  )
const adapter = useIntegration('laravel')
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

:::: stepper Install the Laravel Adapter in your Laravel project

<Card v-bind="adapter" />

Running the following command using the Composer package manager:

::: code-group

```shell [composer]
composer require inertiajs-revamped/laravel
```

:::

::::

:::: stepper Choose your preferred UI framework Adapter.

<Card v-for="adapt in adapters" v-bind="adapt" />

Running the following command using the Composer package manager:

::::

::: stepper Continue following the framework specific Laravel installation Guide
:::

<!--@include: ../../_templates/parts/manual-installation.md-->

<!--@include: ../../_templates/parts/whats-next.md-->

<!--@include: ../../_templates/parts/community.md-->

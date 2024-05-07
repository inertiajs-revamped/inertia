<script setup lang="ts">
import { Head } from '@inertiajs-revamped/vue'

interface Versions {
  laravel: string | number
  php: string | number
}

defineProps<{
  versions: Versions
}>()
</script>

<script lang="ts">
import DefaultLayout from '@/views/layouts/default.vue'

export default {
  layout: DefaultLayout,
}
</script>

<template>
  <div>

    <Head title="Home" />

    <h1>Quick start</h1>
    <p>
      Welcome to the Inertia.js-Revamped/Vue starter preset, with Laravel
      {{ versions.laravel }} & PHP {{ versions.php }}!
    </p>

    <h2>Conventions</h2>
    <p>
      The preset is using
      <a href="https://github.com/innocenzi/laravel-vite/blob/main/docs/src/guide/extra-topics/inertia.md#conventions">
        Laravel Vite conventions
      </a>
      for a consistent and organized architecture:
    </p>
    <ul role="list">
      <li>
        File and directory names use <code>kebab-case</code> instead of
        <code>StudlyCase</code>
      </li>
      <li>Main entrypoint is <code>resources/application/main.tsx</code></li>
      <li>SSR entrypoint is <code>resources/application/ssr.tsx</code></li>
    </ul>

    <h3>Pages & Layouts</h3>
    <ul role="list">
      <li>
        Components are placed in the folder
        <code>resources/views/components</code>
      </li>
      <li>
        Layouts are placed in the folder <code>resources/views/layouts</code>
      </li>
      <li>Pages are placed in the folder <code>resources/views/pages</code></li>
    </ul>

    <h3>Typescript Typings</h3>
    <p>
      Default typings can be found and extended in
      <code>resources/types/inertia-vue.d.ts</code>
    </p>

    <h3>Routes</h3>
    <p>Default routes can be modified in <code>routes/web.php</code></p>

    <h3>Shared props</h3>
    <p>
      Default shared props can be modified in
      <code>app/Http/Middleware/HandleInertiaRequests.php</code>
    </p>

    <h3>Server-side rendering (SSR)</h3>
    <p>Default enabled can be modified in <code>config/inertia.php</code></p>
  </div>
</template>

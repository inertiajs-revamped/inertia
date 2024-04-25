<script setup lang="ts">
import { Link as RouterLink } from '@inertiajs-revamped/vue'
</script>

<template>
  <header>
    <nav class="container">
      <h2>
        <RouterLink href="/">Vue App</RouterLink>
      </h2>
      <ul>
        <li>
          <RouterLink href="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink href="/example">Example</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs-revamped/vue'
</script>

<template>
  <header>
    <nav className="container">
      <Link href="/">
      <span className="brand">
        <svg fill="#4FC08D" role="img" viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <title>Vue.js</title>
          <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" />
        </svg>
        <span>Vue App</span>
      </span>
      </Link>
      <ul>
        <li>
          <Link href="/" :class="{ 'is-active': $page.url === '/' }">
          Home
          </Link>
        </li>
        <li>
          <Link href="/example" :class="{ 'is-active': $page.url === '/example' }">
          Example
          </Link>
        </li>
      </ul>
    </nav>
  </header>
</template>

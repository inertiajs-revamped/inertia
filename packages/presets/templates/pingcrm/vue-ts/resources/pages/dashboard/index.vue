<script setup lang="ts">
import Layout from '@/layouts/layout.vue'
import { Head, Link } from '@inertiajs-revamped/vue'

defineOptions({ layout: Layout })
</script>

<template>

  <Head title="Dashboard" />
  <h1 class="mb-8 text-3xl font-bold">Dashboard</h1>
  <p class="mb-8 leading-normal">Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how <a
      class="text-indigo-500 hover:text-orange-600 underline"
      href="https://inertiajs-revamped.com/">Inertia.js-Revamped</a> works.</p>
  <div class="flex mb-8">
    <Link class="btn-indigo mr-1" href="/500">
    500 error
    </Link>
    <Link class="btn-indigo" href="/404">
    404 error
    </Link>
  </div>
  <p className="leading-normal">
    👆 These links are intended to be broken to illustrate how error
    handling works.
  </p>
</template>

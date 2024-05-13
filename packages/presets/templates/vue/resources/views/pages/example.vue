<script setup>
import { Head } from '@inertiajs-revamped/vue'
import Counter from '@/views/components/counter.vue'
</script>

<script>
import DefaultLayout from '@/views/layouts/default.vue'

export default {
  layout: DefaultLayout,
}
</script>

<template>
  <div>

    <Head title="Example" />

    <h1>Counter</h1>
    <p>This is a simple, hydrated <code>Counter</code> component.</p>
    <Counter />
  </div>
</template>

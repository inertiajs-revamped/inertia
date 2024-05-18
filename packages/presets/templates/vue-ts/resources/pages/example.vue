<script setup lang="ts">
import Counter from '@/components/counter.vue'
import DefaultLayout from '@/layouts/default.vue'
import { Head } from '@inertiajs-revamped/vue'

defineOptions({ layout: DefaultLayout })
</script>

<template>

  <Head title="Example" />
  <h1>Counter</h1>
  <p>This is a simple, hydrated <code>Counter</code> component.</p>
  <Counter />

</template>

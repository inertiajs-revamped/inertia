<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const visit = () => {
  router.get(
    '/sleep',
    {},
    {
      onStart: () => alert('started'),
      onCancel: () => alert('cancelled'),
    }
  )
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates that only one visit can be active at a time</span>
    <span @click="visit" id="visit">Link</span>
  </div>
</template>

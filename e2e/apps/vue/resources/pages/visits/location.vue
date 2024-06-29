<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const locationVisit = () => {
  router.get('/location')
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates location visits</span>

    <span @click="locationVisit" id="example">Location visit</span>
  </div>
</template>

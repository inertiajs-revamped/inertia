<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

const invalidVisit = () => {
  router.post('/non-inertia')
}

const invalidVisitJson = () => {
  router.post('/json')
}
</script>

<template>
  <div>
    <span @click="invalidVisit" id="invalid-visit">Invalid Visit</span>
    <span @click="invalidVisitJson" id="invalid-visit-json">Invalid Visit (JSON response)</span>
  </div>
</template>

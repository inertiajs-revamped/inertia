<script setup lang="ts">
// Props
defineProps({
  method: String,
})
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates inertia-links without the 'as' warning</span>

    <inertia-link :method="method" href="/example" id="get" as="button">{{ method }} button Link</inertia-link>
  </div>
</template>

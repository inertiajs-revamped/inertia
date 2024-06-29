<script setup lang="ts">
// Props
defineProps({
  method: String,
})
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates inertia-links with an 'as' warning</span>

    <inertia-link :method="method" href="/example" id="get">{{ method }} Link</inertia-link>
  </div>
</template>

<script setup lang="ts">
import Layout from '../../../../layouts/site-layout.vue'

defineOptions({
  layout: Layout,
})
</script>

<template>
  <div>
    <span id="text">Simple Persistent Layout - Page B</span>
    <inertia-link href="/persistent-layouts/shorthand/simple/page-a">Page A</inertia-link>
  </div>
</template>

<script setup lang="ts">
import Layout from '../../../../layouts/site-layout.vue'

defineOptions({
  layout: (h, page) => h(Layout, [page]),
})
</script>

<template>
  <div>
    <span id="text">Simple Persistent Layout - Page B</span>
    <inertia-link href="/persistent-layouts/render-function/simple/page-a">Page A</inertia-link>
  </div>
</template>

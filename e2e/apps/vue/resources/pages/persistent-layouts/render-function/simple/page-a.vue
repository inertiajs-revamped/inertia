<template>
  <div>
    <span id="text">Simple Persistent Layout - Page A</span>
    <inertia-link href="/persistent-layouts/render-function/simple/page-b">Page B</inertia-link>
  </div>
</template>

<script lang="ts">
import Layout from '../../../../layouts/site-layout.vue'

export default {
  layout: (h, page) => h(Layout, [page]),
}
</script>

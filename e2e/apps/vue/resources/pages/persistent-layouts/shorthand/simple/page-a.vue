<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import Layout from '../../../../layouts/site-layout.vue'

defineOptions({
  layout: Layout,
})

// this.$.props for declared props
window._inertia_page_props = getCurrentInstance()?.attrs
</script>

<template>
  <div>
    <span id="text">Simple Persistent Layout - Page A</span>
    <inertia-link href="/persistent-layouts/shorthand/simple/page-b">Page B</inertia-link>
  </div>
</template>

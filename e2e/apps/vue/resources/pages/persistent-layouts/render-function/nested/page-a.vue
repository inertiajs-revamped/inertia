<template>
  <div>
    <span id="text">Nested Persistent Layout - Page A</span>
    <inertia-link href="/persistent-layouts/render-function/nested/page-b">Page B</inertia-link>
  </div>
</template>

<script setup lang="ts">
import NestedLayout from '../../../../layouts/nested-layout.vue'
import SiteLayout from '../../../../layouts/site-layout.vue'

defineOptions({
  layout: (h, page) => {
    return h(SiteLayout, [h(NestedLayout, [page])])
  },
})
</script>

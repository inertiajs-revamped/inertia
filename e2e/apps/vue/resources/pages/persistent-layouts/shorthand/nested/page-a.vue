<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import NestedLayout from '../../../../layouts/nested-layout.vue'
import SiteLayout from '../../../../layouts/site-layout.vue'

defineOptions({
  layout: [SiteLayout, NestedLayout],
})

// this.$.props for declared props
window._inertia_page_props = getCurrentInstance()?.attrs
</script>

<template>
  <div>
    <span id="text">Nested Persistent Layout - Page A</span>
    <inertia-link href="/persistent-layouts/shorthand/nested/page-b">Page B</inertia-link>
  </div>
</template>

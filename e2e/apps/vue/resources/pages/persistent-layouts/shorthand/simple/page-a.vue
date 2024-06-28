<template>
  <div>
    <span id="text">Simple Persistent Layout - Page A</span>
    <inertia-link href="/persistent-layouts/shorthand/simple/page-b">Page B</inertia-link>
  </div>
</template>

<script lang="ts">
import Layout from '../../../../layouts/site-layout.vue'

export default {
  layout: Layout,
  created() {
    // this.$.props for declared props
    window._inertia_page_props = this.$.attrs
  },
}
</script>

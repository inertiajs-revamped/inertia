<template>
  <div>
    <span id="text">Nested Persistent Layout - Page A</span>
    <inertia-link href="/persistent-layouts/shorthand/nested/page-b">Page B</inertia-link>
  </div>
</template>

<script lang="ts">
import NestedLayout from '../../../../layouts/nested-layout.vue'
import SiteLayout from '../../../../layouts/site-layout.vue'

export default {
  layout: [SiteLayout, NestedLayout],
  created() {
    // this.$.props for declared props
    window._inertia_page_props = this.$.attrs
  },
}
</script>

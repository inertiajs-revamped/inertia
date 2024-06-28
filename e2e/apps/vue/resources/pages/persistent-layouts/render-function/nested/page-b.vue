<template>
  <div>
    <span id="text">Nested Persistent Layout - Page B</span>
    <inertia-link href="/persistent-layouts/render-function/nested/page-a">Page A</inertia-link>
  </div>
</template>

<script lang="ts">
import NestedLayout from '../../../../layouts/nested-layout.vue'
import SiteLayout from '../../../../layouts/site-layout.vue'

export default {
  layout: (h, page) => {
    return h(SiteLayout, [h(NestedLayout, [page])])
  },
}
</script>

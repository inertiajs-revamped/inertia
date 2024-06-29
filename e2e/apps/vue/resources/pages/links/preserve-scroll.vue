<script setup lang="ts">
import type { Page } from '@inertiajs-revamped/vue'
import WithScrollRegion from '../../layouts/with-scroll-region.vue'

defineOptions({ layout: WithScrollRegion })

// Props
defineProps({
  foo: {
    type: String,
    default: 'default',
  },
})

// Methods
const preserveCallback = (page: Page) => {
  alert(page)

  return true
}

const preserveCallbackFalse = (page: Page) => {
  alert(page)

  return false
}
</script>

<template>
  <div style="height: 800px; width: 600px">
    <span id="text">This is the links page that demonstrates scroll preservation with scroll regions</span>
    <span id="foo">Foo is now {{ foo }}</span>

    <inertia-link href="/links/preserve-scroll-page-two" preserve-scroll :data="{ foo: 'baz' }" id="preserve">Preserve
      Scroll</inertia-link>
    <inertia-link href="/links/preserve-scroll-page-two" :data="{ foo: 'bar' }" id="reset">Reset
      Scroll</inertia-link>

    <inertia-link href="/links/preserve-scroll-page-two" :preserve-scroll="preserveCallback" :data="{ foo: 'baz' }"
      id="preserve-callback">Preserve Scroll (Callback)</inertia-link>
    <inertia-link href="/links/preserve-scroll-page-two" :preserve-scroll="preserveCallbackFalse" :data="{ foo: 'foo' }"
      id="reset-callback">Reset Scroll (Callback)</inertia-link>

    <a href="/non-inertia" id="off-site">Off-site link</a>
  </div>
</template>

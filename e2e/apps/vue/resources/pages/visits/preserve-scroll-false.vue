<template>
  <div style="height: 800px; width: 600px">
    <span id="text">This is the page that demonstrates scroll preservation without scroll regions when using manual
      visits</span>
    <span id="foo">Foo is now {{ foo }}</span>

    <span @click="preserve" id="preserve">Preserve Scroll</span>
    <span @click="preserveFalse" id="reset">Reset Scroll</span>
    <span @click="preserveCallback" id="preserve-callback">Preserve Scroll (Callback)</span>
    <span @click="preserveCallbackFalse" id="reset-callback">Reset Scroll (Callback)</span>
    <span @click="preserveGet" id="preserve-get">Preserve Scroll (GET)</span>
    <span @click="preserveGetFalse" id="reset-get">Reset Scroll (GET)</span>

    <a href="/non-inertia" id="off-site">Off-site link</a>
  </div>
</template>

<script lang="ts">
import WithoutScrollRegion from '../../layouts/without-scroll-region.vue'

export default {
  layout: WithoutScrollRegion,
  props: {
    foo: {
      type: String,
      default: 'default',
    },
  },
  methods: {
    preserve() {
      this.$inertia.visit('/visits/preserve-scroll-false-page-two', {
        data: { foo: 'foo' },
        preserveScroll: true,
      })
    },
    preserveFalse() {
      this.$inertia.visit('/visits/preserve-scroll-false-page-two', {
        data: { foo: 'bar' },
      })
    },
    preserveCallback() {
      this.$inertia.visit('/visits/preserve-scroll-false-page-two', {
        data: { foo: 'baz' },
        preserveScroll: (page) => {
          alert(page)

          return true
        },
      })
    },
    preserveCallbackFalse() {
      this.$inertia.visit('/visits/preserve-scroll-false-page-two', {
        data: { foo: 'foo' },
        preserveScroll: (page) => {
          alert(page)

          return false
        },
      })
    },
    preserveGet() {
      this.$inertia.get(
        '/visits/preserve-scroll-false-page-two',
        {
          foo: 'bar',
        },
        {
          preserveScroll: true,
        }
      )
    },
    preserveGetFalse() {
      this.$inertia.get('/visits/preserve-scroll-false-page-two', {
        foo: 'baz',
      })
    },
  },
}
</script>

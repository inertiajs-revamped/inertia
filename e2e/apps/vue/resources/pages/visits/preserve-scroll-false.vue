<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'
import WithoutScrollRegion from '../../layouts/without-scroll-region.vue'

defineOptions({ layout: WithoutScrollRegion })

// Props
defineProps({
  foo: {
    type: String,
    default: 'default',
  },
})

// Methods
const preserve = () => {
  router.visit('/visits/preserve-scroll-false-page-two', {
    data: { foo: 'foo' },
    preserveScroll: true,
  })
}

const preserveFalse = () => {
  router.visit('/visits/preserve-scroll-false-page-two', {
    data: { foo: 'bar' },
  })
}

const preserveCallback = () => {
  router.visit('/visits/preserve-scroll-false-page-two', {
    data: { foo: 'baz' },
    preserveScroll: (page) => {
      alert(page)

      return true
    },
  })
}

const preserveCallbackFalse = () => {
  router.visit('/visits/preserve-scroll-false-page-two', {
    data: { foo: 'foo' },
    preserveScroll: (page) => {
      alert(page)

      return false
    },
  })
}

const preserveGet = () => {
  router.get(
    '/visits/preserve-scroll-false-page-two',
    {
      foo: 'bar',
    },
    {
      preserveScroll: true,
    }
  )
}

const preserveGetFalse = () => {
  router.get('/visits/preserve-scroll-false-page-two', {
    foo: 'baz',
  })
}
</script>

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

<script setup lang="ts">
import type { Page } from '@inertiajs-revamped/vue'
/* import { onMounted } from 'vue'; */

// Props
defineProps({
  foo: {
    type: String,
    default: 'default',
  },
  fieldValue: String,
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

// !!! Mounted
/* onMounted(() => {
  window._inertia_page_key = this.$.vnode.key
}) */
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates preserve state on inertia-links</span>
    <span id="foo">Foo is now {{ foo }}</span>
    <label>
      Example Field
      <input type="text" id="field" v-model="fieldValue" />
    </label>

    <inertia-link href="/links/preserve-state-page-two" preserve-state :data="{ foo: 'bar' }" id="preserve">[State]
      Preserve: true</inertia-link>
    <inertia-link href="/links/preserve-state-page-two" :preserve-state="false" :data="{ foo: 'baz' }"
      id="preserve-false">[State] Preserve: false</inertia-link>

    <inertia-link href="/links/preserve-state-page-two" :preserve-state="preserveCallback"
      :data="{ foo: 'callback-bar' }" id="preserve-callback">[State] Preserve Callback: true</inertia-link>
    <inertia-link href="/links/preserve-state-page-two" :preserve-state="preserveCallbackFalse"
      :data="{ foo: 'callback-baz' }" id="preserve-callback-false">[State] Preserve Callback: false</inertia-link>
  </div>
</template>

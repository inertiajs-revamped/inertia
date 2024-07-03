<script setup lang="ts">
import type { Page } from '@inertiajs-revamped/vue'

// Props
defineProps({
  foo: {
    type: String,
    default: 'default',
  },
})

// Methods
const preserveCallback = (page: Page) => {
  alert(JSON.stringify(page, null, 2))
  return true
}

const preserveCallbackFalse = (page: Page) => {
  alert(JSON.stringify(page, null, 2))
  return false
}
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates preserve state on inertia-links</span>
    <span id="foo">Foo is now {{ foo }}</span>
    <label>
      Example Field
      <input type="text" name="example-field" id="field" />
    </label>

    <inertia-link href="/links/preserve-state-page-two" :preserve-state="true" :data="{ foo: 'bar' }"
      id="preserve">[State]
      preserve-state: true</inertia-link>
    <inertia-link href="/links/preserve-state-page-two" :preserve-state="false" :data="{ foo: 'baz' }"
      id="preserve-false">[State] Preserve: false</inertia-link>

    <inertia-link href="/links/preserve-state-page-two" :preserve-state="preserveCallback"
      :data="{ foo: 'callback-bar' }" id="preserve-callback">[State] Preserve Callback: true</inertia-link>
    <inertia-link href="/links/preserve-state-page-two" :preserve-state="preserveCallbackFalse"
      :data="{ foo: 'callback-baz' }" id="preserve-callback-false">[State] Preserve Callback: false</inertia-link>
  </div>
</template>

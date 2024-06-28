<template>
  <div>
    <span id="text">This is the links page that demonstrates preserve state on inertia-links</span>
    <span id="foo">Foo is now {{ foo }}</span>
    <label>
      Example Field
      <input type="text" id="field" v-model="field" />
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

<script lang="ts">
import { type Page } from '@inertiajs-revamped/vue'
import { computed } from 'vue'

export default {
  props: {
    foo: {
      type: String,
      default: 'default',
    },
    fieldValue: String,
  },
  setup(props, { emit }) {
    const field = computed({
      get: () => props.fieldValue,
      set: (value) => emit('update:fieldValue', value),
    })

    return {
      field,
    }
  },
  mounted() {
    window._inertia_page_key = this.$.vnode.key
  },
  methods: {
    preserveCallback(page: Page) {
      alert(JSON.stringify(page, null, 2))

      return true
    },
    preserveCallbackFalse(page: Page) {
      alert(JSON.stringify(page, null, 2))

      return false
    },
  },
}
</script>

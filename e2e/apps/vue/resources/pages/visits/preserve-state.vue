<template>
  <div>
    <span id="text">This is the page that demonstrates preserve state on manual visits</span>
    <span id="foo">Foo is now {{ foo }}</span>
    <label>
      Example Field
      <input type="text" name="example-field" id="field" />
    </label>

    <span @click="preserve" id="preserve">[State] Preserve visit: true</span>
    <span @click="preserveFalse" id="preserve-false">[State] Preserve visit: false</span>
    <span @click="preserveCallback" id="preserve-callback">[State] Preserve Callback: true</span>
    <span @click="preserveCallbackFalse" id="preserve-callback-false">[State] Preserve Callback: false</span>
    <span @click="preserveGet" id="preserve-get">[State] Preserve GET: true</span>
    <span @click="preserveGetFalse" id="preserve-get-false">[State] Preserve GET: false</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    foo: {
      type: String,
      default: 'default',
    },
  },
  mounted() {
    window._inertia_page_key = this.$.vnode.key
  },
  methods: {
    preserve() {
      this.$inertia.visit('/visits/preserve-state-page-two', {
        data: { foo: 'bar' },
        preserveState: true,
      })
    },
    preserveFalse() {
      this.$inertia.visit('/visits/preserve-state-page-two', {
        data: { foo: 'baz' },
        preserveState: false,
      })
    },
    preserveCallback() {
      this.$inertia.get(
        '/visits/preserve-state-page-two',
        {
          foo: 'callback-bar',
        },
        {
          preserveState: (page) => {
            alert(page)

            return true
          },
        }
      )
    },
    preserveCallbackFalse() {
      this.$inertia.get(
        '/visits/preserve-state-page-two',
        {
          foo: 'callback-baz',
        },
        {
          preserveState: (page) => {
            alert(page)

            return false
          },
        }
      )
    },
    preserveGet() {
      this.$inertia.get(
        '/visits/preserve-state-page-two',
        {
          foo: 'get-bar',
        },
        {
          preserveState: true,
        }
      )
    },
    preserveGetFalse() {
      this.$inertia.get(
        '/visits/preserve-state-page-two',
        {
          foo: 'get-baz',
        },
        {
          preserveState: false,
        }
      )
    },
  },
}
</script>

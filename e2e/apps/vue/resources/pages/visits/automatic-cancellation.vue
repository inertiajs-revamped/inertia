<template>
  <div>
    <span id="text">This is the page that demonstrates that only one visit can be active at a time</span>
    <span @click="visit" id="visit">Link</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    visit() {
      this.$inertia.get(
        '/sleep',
        {},
        {
          onStart: () => alert('started'),
          onCancel: () => alert('cancelled'),
        }
      )
    },
  },
}
</script>

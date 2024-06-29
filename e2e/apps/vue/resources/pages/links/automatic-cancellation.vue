<script setup lang="ts">
// Methods
const alert = (message: string) => {
  return window.alert(message)
}
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates that only one visit can be active at a time</span>
    <inertia-link href="/sleep" id="visit" @cancel="() => alert('cancelled')"
      @start="() => alert('started')">Link</inertia-link>
  </div>
</template>

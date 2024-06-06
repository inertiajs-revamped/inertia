<script setup lang="ts">
defineProps<{
  type: 'info' | 'tip' | 'warning' | 'danger' | 'details' | 'important'
}>()
</script>

<template>
  <div :class="`${type} custom-block`" style="padding-top: 8px">
    <slot />
  </div>
</template>

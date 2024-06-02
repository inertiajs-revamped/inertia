<template>
  <template v-if="props.adapter === 'preact'">
    <slot name="preact" />
  </template>
  <template v-else-if="props.adapter === 'react'">
    <slot name="react" />
  </template>
  <template v-else-if="props.adapter === 'vue'">
    <slot name="vue" />
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  adapter: string
}>()
</script>

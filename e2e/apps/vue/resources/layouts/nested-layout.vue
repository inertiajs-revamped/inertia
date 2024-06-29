<script setup lang="ts">
import { ref } from 'vue'

// Data
const createdAt = ref(0)

// Created
createdAt.value = Date.now()
// !!! window._inertia_nested_layout_props = this.$.vnode.props
</script>

<template>
  <div>
    <span>Nested Layout</span>
    <span>{{ createdAt }}</span>
    <div>
      <slot />
    </div>
  </div>
</template>

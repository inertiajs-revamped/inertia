<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

// Data
const createdAt = ref(0)

// Created
createdAt.value = Date.now()
window._inertia_site_layout_props = getCurrentInstance()?.vnode.props
</script>

<template>
  <div>
    <span>Site Layout</span>
    <span>{{ createdAt }}</span>
    <div>
      <slot />
    </div>
  </div>
</template>

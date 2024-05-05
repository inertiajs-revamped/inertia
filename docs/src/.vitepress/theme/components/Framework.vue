<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ title: string }>()

const computedTitle = computed(() => {
  return props.title[0]?.toUpperCase() + props.title.slice(1)
})
</script>

<template>
  <div class="framework">
    <span class="framework-item">
      <BaseIcon :iconId="props.title" />
      {{ computedTitle }}
    </span>
  </div>
</template>

<style>
.framework {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
}

.framework svg {
  max-width: 24px;
}

.framework-item {
  display: flex;
  font-weight: 600;
  align-items: flex-start;
  gap: 0.5rem;
}
</style>

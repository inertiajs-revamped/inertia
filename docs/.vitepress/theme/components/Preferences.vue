<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(true)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const removeOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.add('no-outline')
}

const restoreOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.remove('no-outline')
}
</script>

<template>
  <div class="preference">
    <button class="toggle" aria-label="preference select toggle" aria-controls="preference-select"
      :aria-expanded="isOpen" @click="toggleOpen" @mousedown="removeOutline" @blur="restoreOutline">
      <span>Adapter Preference</span>
      <span :class="[isOpen ? 'vpi-chevron-up' : 'vpi-chevron-down', ' vt-link-icon']" />
    </button>
    <slot v-if="isOpen" />
  </div>
</template>

<style scoped>
.preference {
  font-size: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: border-color 0.5s, background-color 0.5s ease;
  margin-bottom: 20px;
  position: sticky;
  top: -0.5px;
  background-color: var(--vp-sidebar-bg-color);
  padding-top: 10px;
  z-index: 10;
}

.toggle {
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  margin-bottom: 10px;
  width: 100%;
  font-weight: 600;
}

.toggle:hover {
  color: var(--vp-c-text-1);
}

.no-outline {
  outline: 0;
}

.vt-link-icon {
  position: relative;
  top: 1px;
}

.vt-link-icon.open {
  transform: rotate(180deg);
}
</style>

<script setup lang="ts">
import {
  type Integration,
  useIntegrations,
} from '@/theme/composables/useIntegrations'
import { useLocalStorage } from '@/theme/composables/useLocalStorage'
import { capitalize } from '@/utils'
import { onContentUpdated } from 'vitepress'
import { ref, watch } from 'vue'

const integrations = useIntegrations()
const preferIntegration = useLocalStorage<Integration | undefined>(
  'inertia-docs-prefer-integration',
  undefined
)

const isOpen = ref(false)
const main = ref<HTMLDivElement>()

const toggleIntegration = (integration: Integration) => {
  if (preferIntegration.value !== integration) {
    preferIntegration.value = integration
  }
  toggleOpen()
}

function closeOnClickOutside(e: Event) {
  if (!main.value?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, (value) => {
  if (value) {
    document.addEventListener('click', closeOnClickOutside)
    return
  }
  document.removeEventListener('click', closeOnClickOutside)
})

onContentUpdated(() => {
  isOpen.value = false
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="dropdown" ref="main">
    <button @click="toggleOpen" class="dropdown-btn" aria-haspopup="true" aria-controls="dropdown-menu">
      <span v-if="preferIntegration" class="dropdown-active-item">
        <BaseIcon :iconId="preferIntegration.name" width="20" height="20" />
        <span>{{ capitalize(preferIntegration.name) }}</span>
        <Badge type="info" class="small batch-align">v{{ preferIntegration.version }}</Badge>
      </span>
      <span v-else class="dropdown-default">
        Select Integration
        <span :class="[isOpen ? 'vpi-chevron-up' : 'vpi-chevron-down', ' text-icon']" />
      </span>
    </button>
    <div v-if="isOpen" class="dropdown-menu" id="dropdown-menu" role="menu">
      <a v-for="pkg in integrations" @click="toggleIntegration(pkg)" :href="`/integrations/${pkg.name}/`"
        class="dropdown-item">
        <BaseIcon :iconId="pkg.name" width="20" height="20" />
        <span>{{ capitalize(pkg.name) }}</span>
        <Badge type="info" class="small batch-align">v{{ pkg.version }}</Badge>
      </a>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  user-select: none;
}

.dropdown-btn {
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 8px;
  width: 100%;
  min-width: 2.75em;
  height: 2.75em;
  /*   padding: 0 1em; */
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  align-self: flex-start;
}

.dropdown-btn:hover {
  background-color: var(--vp-c-default-soft);
}

.dropdown-menu {
  position: absolute;
  padding: 4px 0;
  margin-top: 2px;
  z-index: 50;
  right: auto;
  left: 0;
  width: 100%;
  min-width: max-content;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.batch-align {
  transform: translateY(-6px);
  align-self: self-end;
  margin-left: auto;
}

.dropdown-divider {
  background-color: var(--vp-c-border);
  border: none;
  display: block;
  height: 1px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 6px;
  padding: 0 8px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 300;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  margin: 4px 8px;
  /* transition: background-color 0.25s, color 0.25s; */
}

.dropdown-item:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.dropdown-default {
  width: 100%;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-active-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 8px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 300;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  margin: 4px 8px;
  width: 100%;
  /* transition: background-color 0.25s, color 0.25s; */
}
</style>
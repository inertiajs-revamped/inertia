<script setup lang="ts">
import { useIntegrations } from '@/theme/composables/useIntegrations'
import { usePreferences } from '@/theme/composables/usePreferences'
import type { Integration } from '@/types'
import { onContentUpdated, useRouter } from 'vitepress'
import { onMounted, ref, watch } from 'vue'

const router = useRouter()
const integrations = useIntegrations()
const storage = usePreferences()

const isOpen = ref(false)
const main = ref<HTMLDivElement>()

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const toggleIntegration = (integration: Integration) => {
  toggleOpen()
  if (storage.value?.name !== integration.name) {
    storage.value = integration
    router.go(`/integrations/${integration.name}/`)
  }
}

function closeOnClickOutside(e: Event) {
  if (!main.value?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  watch(isOpen, (value) => {
    if (value) {
      document.addEventListener('click', closeOnClickOutside)
      return
    }
    document.removeEventListener('click', closeOnClickOutside)
  })
})

onContentUpdated(() => {
  isOpen.value = false
})
</script>

<template>
  <div class="dropdown" ref="main">
    <button @click="toggleOpen" id="preference-select" class="dropdown-btn" aria-haspopup="true">
      <span v-if="storage" class="dropdown-active-item">
        <BaseIcon :iconId="storage.name" width="20" height="20" />
        <span>{{ storage.title }}</span>
        <Badge type="info" class="small batch-align">v{{ storage.version }}</Badge>
      </span>
      <span v-else class="dropdown-default">
        Select Integration
        <span :class="[isOpen ? 'vpi-chevron-up' : 'vpi-chevron-down', ' text-icon']" />
      </span>
    </button>
    <div v-if="isOpen" id="dropdown-menu" class="dropdown-menu" role="menu">
      <template v-for="integration in integrations">
        <a v-if="integration.name !== 'laravel'" v-on:click.prevent="toggleIntegration(integration)"
          :href="`/integrations/${integration.name}/`" class="dropdown-item">
          <BaseIcon :iconId="integration.name" width="20" height="20" />
          <span>{{ integration.title }}</span>
          <Badge type="info" class="small batch-align">v{{ integration.version }}</Badge>
        </a>
      </template>
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

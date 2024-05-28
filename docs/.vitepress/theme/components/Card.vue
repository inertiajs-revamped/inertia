<script setup lang="ts">
import type { Integration } from '@/theme/composables/useIntegrations'
import { useLocalStorage } from '@/theme/composables/useLocalStorage'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  description: string
  version: string
}>()

const preferIntegration = useLocalStorage<Integration | undefined>(
  'inertia-docs-prefer-integration',
  undefined
)

const toggleIntegration = (integration: Integration) => {
  if (
    preferIntegration.value !== integration &&
    integration.name !== 'laravel'
  ) {
    preferIntegration.value = integration
  }
}

const computedTitle = computed(() => {
  return props.name[0]?.toUpperCase() + props.name.slice(1)
})
</script>

<template>
  <a @click="toggleIntegration(props)"
    :href="`${props.name === 'laravel' ? `/integrations/${props.name}/` : `/integrations/${props.name}/`}`" class="card"
    type="button">
    <BaseIcon :iconId="props.name" width="50" height="50" />
    <div class="card-meta">
      <span class="card-title">{{ computedTitle }} Adapter</span>
      <span class="card-badge">
        <Badge type="danger">v{{ props.version }}</Badge>
      </span>
      <div class="card-desc">@inertiajs-revamped/{{ props.name }}</div>
    </div>
  </a>
</template>

<style scoped>
.card {
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  text-decoration: none;
}

.card:hover {
  background-color: var(--vp-c-default-soft);
}

.card svg {
  align-self: stretch;
  justify-content: center;
  width: auto;
  padding-inline: 0.5rem;
  /* width: 50px;
  height: 50px; */
}

.card-meta {
  flex: 1 1 0%;
  padding-inline: 1rem;
}

.card-title {
  color: var(--vp-c-text-1);
  font-weight: 600;
  padding-inline-end: 0.5rem;
}

.card-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media only screen and (max-width: 768px) {

  .stepper div[class*='language-'],
  .stepper .card {
    width: calc(100% + 3rem);
    margin-left: -3rem;
  }

  .card svg {
    max-width: 50px;
    padding-inline: 0 1rem;
  }

  .card-meta {
    padding-inline: 0;
  }

  .card-badge .VPBadge {
    font-size: 11px;
    padding-inline: 0.5rem;
  }

  .card-desc {
    font-size: 13px;
  }
}
</style>

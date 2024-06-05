<script setup lang="ts">
import { usePreferences } from '@/theme/composables/usePreferences'
import type { Integration } from '@/types'
import { useRouter } from 'vitepress'

const { name, description, title, version, url, componentExt } =
  defineProps<Integration>()

const router = useRouter()
const storage = usePreferences()

const toggleIntegration = (integration: Integration) => {
  if (
    storage.value?.name !== integration.name &&
    integration.name !== 'laravel'
  ) {
    storage.value = integration
  }
  router.go(`/integrations/${integration.name}/`)
}
</script>

<template>
  <a v-on:click.prevent="toggleIntegration({ name, description, title, version, url, componentExt })"
    :href="`/integrations/${name}/`" class="integration" type="button">
    <BaseIcon :iconId="name" width="50" height="50" />
    <div class="integration-meta">
      <span class="integration-title">{{ title }} Adapter</span>
      <span class="integration-badge">
        <Badge type="danger">v{{ version }}</Badge>
      </span>
      <div class="integration-desc">@inertiajs-revamped/{{ name }}</div>
    </div>
  </a>
</template>

<style scoped>
.integration {
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

.integration:hover {
  background-color: var(--vp-c-gray-3);
}

.integration svg {
  align-self: stretch;
  justify-content: center;
  width: auto;
  padding-inline: 0.5rem;
}

.integration-meta {
  flex: 1 1 0%;
  padding-inline: 1rem;
}

.integration-title {
  color: var(--vp-c-text-1);
  font-weight: 600;
  padding-inline-end: 0.5rem;
}

.integration-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media only screen and (max-width: 768px) {

  /* .stepper div[class*='language-'], */
  .stepper .integration {
    width: calc(100% + 3rem);
    margin-left: -3rem;
  }

  .integration svg {
    max-width: 50px;
    padding-inline: 0 1rem;
  }

  .integration-meta {
    padding-inline: 0;
  }

  .integration-badge .VPBadge {
    font-size: 11px;
    padding-inline: 0.5rem;
  }

  .integration-desc {
    font-size: 13px;
  }
}
</style>

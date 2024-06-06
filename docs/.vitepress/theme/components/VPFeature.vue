<script setup lang="ts">
import { useIntegration } from '@/theme/composables/useIntegrations'
import { usePreferences } from '@/theme/composables/usePreferences'
import type { Integration } from '@/types'
import { useRouter } from 'vitepress'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import type { DefaultTheme } from 'vitepress/theme'
import { capitalize } from 'vue'

// this is dirty

const props = defineProps<{
  icon?: DefaultTheme.FeatureIcon
  title: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}>()

const router = useRouter()
const storage = usePreferences()
const integration = useIntegration(props.title)

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
  <VPLink class="VPFeature" v-on:click.prevent="toggleIntegration(integration!)" :href="link" :rel="rel"
    :target="target" :no-icon="true" :tag="link ? 'a' : 'div'">
    <article class="box">
      <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage :image="icon" :alt="icon.alt" :height="icon.height || 48" :width="icon.width || 48" />
      </div>
      <VPImage v-else-if="typeof icon === 'object'" :image="icon" :alt="icon.alt" :height="icon.height || 48"
        :width="icon.width || 48" />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <div class="meta">
        <h2 class="title" v-html="`${capitalize(title)} Adapter`"></h2>
        <p v-if="details" class="details" v-html="details"></p>
      </div>

      <div v-if="linkText" class="link-text">
        <p class="link-text-value">
          {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
        </p>
      </div>
    </article>
  </VPLink>
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  padding-inline: 0.5rem;
}

.VPFeature.link:hover {
  background-color: var(--vp-c-gray-3);
}

.box {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  height: 100%;
}

.meta {
  display: flex;
  flex-direction: column;
  padding-inline-start: 0.5rem;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.link-text-icon {
  margin-left: 6px;
}
</style>

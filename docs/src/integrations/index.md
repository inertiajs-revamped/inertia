# Integrations

Choose your preferred UI framework.

<Integration v-for="pkg in integrations" v-bind="pkg" />

<script setup lang="ts">
import { useIntegrations } from '@/theme/composables/useIntegrations'
const integrations = useIntegrations()
</script>

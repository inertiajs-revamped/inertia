# Adapter Integrations

Select your prefered framework Adapter.

<Card v-for="pkg in integrations" :name="pkg.name" :description="pkg.description" :version="pkg.version" />

<script setup lang="ts">
import { useIntegrations } from '@/theme/composables/useIntegrations'
const integrations = useIntegrations()
</script>

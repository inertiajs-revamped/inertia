<script setup lang="ts">
import Icon from '@/components/icon.vue'
import Pagination from '@/components/pagination.vue'
import SearchFilter from '@/components/search-filter.vue'
import Layout from '@/layouts/layout.vue'
import { pickBy, throttle } from '@/utils'
import {
  Head,
  Link,
  type ModelPagination,
  type PageProps,
  router,
} from '@inertiajs-revamped/vue'
import { type PropType, ref, watch } from 'vue'

defineOptions({ layout: Layout })

const props = defineProps({
  filters: {
    type: Object as PropType<PageProps['filters']>,
    required: true,
  },
  organizations: {
    type: Object as PropType<ModelPagination<PageProps['organization']>>,
    required: true,
  },
})

const form = ref({
  search: props.filters.search,
  trashed: props.filters.trashed,
})

watch(
  form,
  throttle(() => {
    router.get('/organizations', pickBy(form.value), { preserveState: true })
  }, 150),
  { deep: true }
)

const reset = () => {
  form.value = {
    search: null,
    trashed: null,
  }
}
</script>

<template>

  <Head title="Organizations" />
  <h1 class="mb-8 text-3xl font-bold">Organizations</h1>
  <div class="flex items-center justify-between mb-6">
    <SearchFilter v-model="form.search" class="mr-4 w-full max-w-md" @reset="reset">
      <label class="block text-gray-700">Trashed:</label>
      <select v-model="form.trashed"
        class="form-select mt-1 w-full focus:outline-none focus:ring-1 focus:ring-indigo-400">
        <option :value="null" />
        <option value="with">With Trashed</option>
        <option value="only">Only Trashed</option>
      </select>
    </SearchFilter>
    <Link class="btn-indigo" href="/organizations/create">
    <span>Create</span>
    <span class="hidden md:inline">&nbsp;Organization</span>
    </Link>
  </div>
  <div class="bg-white rounded-md shadow overflow-x-auto">
    <table class="w-full whitespace-nowrap">
      <thead>
        <tr class="text-left font-bold">
          <th class="pb-4 pt-6 px-6">Name</th>
          <th class="pb-4 pt-6 px-6">City</th>
          <th class="pb-4 pt-6 px-6" colspan="2">Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="organization in organizations.data" :key="organization.id"
          class="hover:bg-gray-100 focus-within:bg-gray-100">
          <td class="border-t">
            <Link class="flex items-center px-6 py-4 focus:text-indigo-500"
              :href="`/organizations/${organization.id}/edit`">
            {{ organization.name }}
            <Icon v-if="organization.deleted_at" name="trash" class="shrink-0 ml-2 w-3 h-3 fill-gray-400" />
            </Link>
          </td>
          <td class="border-t">
            <Link class="flex items-center px-6 py-4" :href="`/organizations/${organization.id}/edit`" tabindex="-1">
            {{ organization.city }}
            </Link>
          </td>
          <td class="border-t">
            <Link class="flex items-center px-6 py-4" :href="`/organizations/${organization.id}/edit`" tabindex="-1">
            {{ organization.phone }}
            </Link>
          </td>
          <td class="w-px border-t">
            <Link class="flex items-center px-4" :href="`/organizations/${organization.id}/edit`" tabindex="-1">
            <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
            </Link>
          </td>
        </tr>
        <tr v-if="organizations.data.length === 0">
          <td class="px-6 py-4 border-t" colspan="4">No organizations found.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination class="mt-6" :links="organizations.links" />
</template>

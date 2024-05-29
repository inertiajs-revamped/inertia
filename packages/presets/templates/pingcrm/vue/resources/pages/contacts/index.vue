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
  contacts: {
    type: Object as PropType<ModelPagination<PageProps['contact']>>,
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
    router.get('/contacts', pickBy(form.value), { preserveState: true })
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

  <Head title="Contacts" />
  <h1 class="mb-8 text-3xl font-bold">Contacts</h1>
  <div class="flex items-center justify-between mb-6">
    <SearchFilter v-model="form.search" class="mr-4 w-full max-w-md" @reset="reset">
      <label class="block text-gray-700">Trashed:</label>
      <select v-model="form.trashed" class="form-select mt-1 w-full">
        <option :value="null" />
        <option value="with">With Trashed</option>
        <option value="only">Only Trashed</option>
      </select>
    </SearchFilter>
    <Link class="btn-indigo" href="/contacts/create">
    <span>Create</span>
    <span class="hidden md:inline">&nbsp;Contact</span>
    </Link>
  </div>
  <div class="bg-white rounded-md shadow overflow-x-auto">
    <table class="w-full whitespace-nowrap">
      <tr class="text-left font-bold">
        <th class="pb-4 pt-6 px-6">Name</th>
        <th class="pb-4 pt-6 px-6">Organization</th>
        <th class="pb-4 pt-6 px-6">City</th>
        <th class="pb-4 pt-6 px-6" colspan="2">Phone</th>
      </tr>
      <tr v-for="contact in contacts.data" :key="contact.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
        <td class="border-t">
          <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="`/contacts/${contact.id}/edit`">
          {{ contact.name }}
          <Icon v-if="contact.deleted_at" name="trash" class="shrink-0 ml-2 w-3 h-3 fill-gray-400" />
          </Link>
        </td>
        <td class="border-t">
          <Link class="flex items-center px-6 py-4" :href="`/contacts/${contact.id}/edit`" tabindex="-1">
          <div v-if="contact.organization">
            {{ contact.organization.name }}
          </div>
          </Link>
        </td>
        <td class="border-t">
          <Link class="flex items-center px-6 py-4" :href="`/contacts/${contact.id}/edit`" tabindex="-1">
          {{ contact.city }}
          </Link>
        </td>
        <td class="border-t">
          <Link class="flex items-center px-6 py-4" :href="`/contacts/${contact.id}/edit`" tabindex="-1">
          {{ contact.phone }}
          </Link>
        </td>
        <td class="w-px border-t">
          <Link class="flex items-center px-4" :href="`/contacts/${contact.id}/edit`" tabindex="-1">
          <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
          </Link>
        </td>
      </tr>
      <tr v-if="contacts.data.length === 0">
        <td class="px-6 py-4 border-t" colspan="4">No contacts found.</td>
      </tr>
    </table>
  </div>
  <Pagination class="mt-6" :links="contacts.links" />
</template>

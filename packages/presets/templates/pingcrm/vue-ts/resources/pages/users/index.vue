<script setup lang="ts">
import Icon from '@/components/icon.vue'
import SearchFilter from '@/components/search-filter.vue'
import Layout from '@/layouts/layout.vue'
import { pickBy, throttle } from '@/utils'
import { Head, Link, type PageProps, router } from '@inertiajs-revamped/vue'
import { type PropType, ref, watch } from 'vue'

defineOptions({ layout: Layout })

const props = defineProps({
  filters: {
    type: Object as PropType<PageProps['filters']>,
    required: true,
  },
  users: {
    type: Object as PropType<PageProps['users']>,
    required: true,
  },
})

const form = ref({
  search: props.filters.search,
  role: props.filters.role,
  trashed: props.filters.trashed,
})

watch(
  form,
  throttle(() => {
    router.get('/users', pickBy(form.value), { preserveState: true })
  }, 150),
  { deep: true }
)

const reset = () => {
  form.value = {
    search: null,
    role: null,
    trashed: null,
  }
}
</script>

<template>

  <Head title="Users" />
  <h1 class="mb-8 text-3xl font-bold">Users</h1>
  <div class="flex items-center justify-between mb-6">
    <SearchFilter v-model="form.search" class="mr-4 w-full max-w-md" @reset="reset">
      <label class="block text-gray-700">Role:</label>
      <select v-model="form.role" class="form-select mt-1 w-full focus:outline-none focus:ring-1 focus:ring-indigo-400">
        <option :value="null" />
        <option value="user">User</option>
        <option value="owner">Owner</option>
      </select>
      <label class="block mt-4 text-gray-700">Trashed:</label>
      <select v-model="form.trashed"
        class="form-select mt-1 w-full focus:outline-none focus:ring-1 focus:ring-indigo-400">
        <option :value="null" />
        <option value="with">With Trashed</option>
        <option value="only">Only Trashed</option>
      </select>
    </SearchFilter>
    <Link class="btn-indigo" href="/users/create">
    <span>Create</span>
    <span class="hidden md:inline">&nbsp;User</span>
    </Link>
  </div>
  <div class="bg-white rounded-md shadow overflow-x-auto">
    <table class="w-full whitespace-nowrap">
      <tr class="text-left font-bold">
        <th class="pb-4 pt-6 px-6">Name</th>
        <th class="pb-4 pt-6 px-6">Email</th>
        <th class="pb-4 pt-6 px-6" colspan="2">Role</th>
      </tr>
      <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
        <td class="border-t">
          <Link class="flex items-center px-6 py-4 focus:text-indigo-500" :href="`/users/${user.id}/edit`">
          <img v-if="user.photo" class="block -my-2 mr-2 w-5 h-5 rounded-full" :src="user.photo" />
          {{ user.name }}
          <Icon v-if="user.deleted_at" name="trash" class="shrink-0 ml-2 w-3 h-3 fill-gray-400" />
          </Link>
        </td>
        <td class="border-t">
          <Link class="flex items-center px-6 py-4" :href="`/users/${user.id}/edit`" tabindex="-1">
          {{ user.email }}
          </Link>
        </td>
        <td class="border-t">
          <Link class="flex items-center px-6 py-4" :href="`/users/${user.id}/edit`" tabindex="-1">
          {{ user.owner ? 'Owner' : 'User' }}
          </Link>
        </td>
        <td class="w-px border-t">
          <Link class="flex items-center px-4" :href="`/users/${user.id}/edit`" tabindex="-1">
          <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
          </Link>
        </td>
      </tr>
      <tr v-if="users.length === 0">
        <td class="px-6 py-4 border-t" colspan="4">No users found.</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import LoadingButton from '@/components/loading-button.vue'
import SelectInput from '@/components/select-input.vue'
import TextInput from '@/components/text-input.vue'
import Layout from '@/layouts/layout.vue'
import { Head, Link, type PageProps, useForm } from '@inertiajs-revamped/vue'
import type { PropType } from 'vue'

defineOptions({ layout: Layout })

defineProps({
  organizations: {
    type: Array as PropType<PageProps['organizations']>,
    required: true,
  },
})

const form = useForm({
  first_name: '',
  last_name: '',
  organization_id: null,
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  country: '',
  postal_code: '',
})

const store = () => {
  form.post('/contacts')
}
</script>

<template>

  <Head title="Create Contact" />
  <h1 class="mb-8 text-3xl font-bold">
    <Link class="text-indigo-400 hover:text-indigo-600" href="/contacts">Contacts</Link>
    <span class="font-medium"> /</span> Create
  </h1>
  <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
    <form @submit.prevent="store">
      <div class="flex flex-wrap -mb-8 -mr-6 p-8">
        <TextInput v-model="form.first_name" :error="form.errors.first_name" class="pb-8 pr-6 w-full lg:w-1/2"
          label="First name" />
        <TextInput v-model="form.last_name" :error="form.errors.last_name" class="pb-8 pr-6 w-full lg:w-1/2"
          label="Last name" />
        <SelectInput v-model="form.organization_id" :error="form.errors.organization_id"
          class="pb-8 pr-6 w-full lg:w-1/2" label="Organization">
          <option :value="null" />
          <option v-for="organization in organizations" :key="organization.id" :value="organization.id">{{
            organization.name }}</option>
        </SelectInput>
        <TextInput v-model="form.email" :error="form.errors.email" class="pb-8 pr-6 w-full lg:w-1/2" label="Email" />
        <TextInput v-model="form.phone" :error="form.errors.phone" class="pb-8 pr-6 w-full lg:w-1/2" label="Phone" />
        <TextInput v-model="form.address" :error="form.errors.address" class="pb-8 pr-6 w-full lg:w-1/2"
          label="Address" />
        <TextInput v-model="form.city" :error="form.errors.city" class="pb-8 pr-6 w-full lg:w-1/2" label="City" />
        <TextInput v-model="form.region" :error="form.errors.region" class="pb-8 pr-6 w-full lg:w-1/2"
          label="Province/State" />
        <SelectInput v-model="form.country" :error="form.errors.country" class="pb-8 pr-6 w-full lg:w-1/2"
          label="Country">
          <option :value="null" />
          <option value="CA">Canada</option>
          <option value="US">United States</option>
        </SelectInput>
        <TextInput v-model="form.postal_code" :error="form.errors.postal_code" class="pb-8 pr-6 w-full lg:w-1/2"
          label="Postal code" />
      </div>
      <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
        <LoadingButton :loading="form.processing" class="btn-indigo" type="submit">Create Contact</LoadingButton>
      </div>
    </form>
  </div>
</template>

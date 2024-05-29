<script setup lang="ts">
import FileInput from '@/components/file-input.vue'
import LoadingButton from '@/components/loading-button.vue'
import SelectInput from '@/components/select-input.vue'
import TextInput from '@/components/text-input.vue'
import Layout from '@/layouts/layout.vue'
import { Head, Link, useForm } from '@inertiajs-revamped/vue'

defineOptions({ layout: Layout })

const form = useForm({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  owner: false,
  photo: null,
})

const store = () => {
  form.post('/users')
}
</script>

<template>

  <Head title="Create User" />
  <h1 class="mb-8 text-3xl font-bold">
    <Link class="text-indigo-400 hover:text-indigo-600" href="/users">Users</Link>
    <span class="font-medium"> /</span> Create
  </h1>
  <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
    <form @submit.prevent="store">
      <div class="flex flex-wrap -mb-8 -mr-6 p-8">
        <TextInput v-model="form.first_name" :error="form.errors.first_name" class="pb-8 pr-6 w-full lg:w-1/2"
          label="First name" />
        <TextInput v-model="form.last_name" :error="form.errors.last_name" class="pb-8 pr-6 w-full lg:w-1/2"
          label="Last name" />
        <TextInput v-model="form.email" :error="form.errors.email" class="pb-8 pr-6 w-full lg:w-1/2" label="Email" />
        <TextInput v-model="form.password" :error="form.errors.password" class="pb-8 pr-6 w-full lg:w-1/2"
          type="password" autocomplete="new-password" label="Password" />
        <SelectInput v-model="form.owner" :error="form.errors.owner" class="pb-8 pr-6 w-full lg:w-1/2" label="Owner">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </SelectInput>
        <FileInput v-model="form.photo" :error="form.errors.photo" class="pb-8 pr-6 w-full lg:w-1/2" type="file"
          accept="image/*" label="Photo" />
      </div>
      <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
        <LoadingButton :loading="form.processing" class="btn-indigo" type="submit">Create User</LoadingButton>
      </div>
    </form>
  </div>
</template>

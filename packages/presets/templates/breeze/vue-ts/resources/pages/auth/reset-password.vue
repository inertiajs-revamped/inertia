<script setup lang="ts">
import InputError from '@/components/input-error.vue'
import InputLabel from '@/components/input-label.vue'
import PrimaryButton from '@/components/primary-button.vue'
import TextInput from '@/components/text-input.vue'
import GuestLayout from '@/layouts/guest-layout.vue'
import { Head, useForm } from '@inertiajs-revamped/vue'

const props = defineProps<{
  email: string
  token: string
}>()

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
})

const submit = () => {
  form.post('/reset-password', {
    onFinish: () => {
      form.reset('password', 'password_confirmation')
    },
  })
}
</script>

<template>
  <GuestLayout>

    <Head title="Reset Password" />

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus
          autocomplete="username" />

        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
          autocomplete="new-password" />

        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" value="Confirm Password" />

        <TextInput id="password_confirmation" type="password" class="mt-1 block w-full"
          v-model="form.password_confirmation" required autocomplete="new-password" />

        <InputError class="mt-2" :message="form.errors.password_confirmation" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Reset Password
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>

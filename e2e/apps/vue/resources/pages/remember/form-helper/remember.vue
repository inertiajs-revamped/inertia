<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="name" v-model="form.name" />
    </label>
    <span id="name_error" v-if="form.errors.name">{{ form.errors.name }}</span>
    <label>
      Handle
      <input type="text" id="handle" name="handle" v-model="form.handle" />
    </label>
    <span id="handle_error" v-if="form.errors.handle">{{ form.errors.handle }}</span>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="form.remember" />
    </label>
    <span id="remember_error" v-if="form.errors.remember">{{ form.errors.remember }}</span>
    <label>
      Untracked
      <input type="text" id="untracked" name="untracked" v-model="untracked" />
    </label>

    <span @click="submit" id="submit">Submit form</span>
    <span @click="reset" id="reset-one">Reset one field & error</span>

    <inertia-link href="/dump/get" id="link">Navigate away</inertia-link>
  </div>
</template>

<script setup lang="ts">
import { useForm, useRemember } from '@inertiajs-revamped/vue'
import { ref } from 'vue'

const untracked = ref('')

const form = useForm({
  name: 'foo',
  handle: 'example',
  remember: false,
})

useRemember(form)

const submit = () => {
  form.post('/remember/form-helper/remember')
}
const reset = () => {
  form.reset('handle').clearErrors('name')
}
</script>

<script setup lang="ts">
import { useForm } from '@inertiajs-revamped/vue'

// Data
const form = useForm({
  name: 'foo',
  handle: 'example',
  remember: false,
})

// Methods
const submit = () => {
  form.post('/form-helper/errors')
}

const clearErrors = () => {
  form.clearErrors()
}

const clearError = () => {
  form.clearErrors('handle')
}

const setErrors = () => {
  form.setError({
    name: 'Manually set Name error',
    handle: 'Manually set Handle error',
    remember: '',
  })
}

const setError = () => {
  form.setError('handle', 'Manually set Handle error')
}
</script>

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

    <span @click="submit" id="submit">Submit form</span>

    <span @click="clearErrors" id="clear">Clear all errors</span>
    <span @click="clearError" id="clear-one">Clear one error</span>
    <span @click="setErrors" id="set">Set errors</span>
    <span @click="setError" id="set-one">Set one error</span>

    <span id="errors-status">Form has {{ form.hasErrors ? '' : 'no ' }}errors</span>
  </div>
</template>

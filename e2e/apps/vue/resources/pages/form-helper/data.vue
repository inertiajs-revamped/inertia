<script setup lang="ts">
import { useForm, usePage } from '@inertiajs-revamped/vue'

// Data
const { url } = usePage()

const form = useForm({
  name: 'foo',
  handle: 'example',
  remember: false,
})

// Methods
const submit = () => {
  form.post(url)
}

const resetAll = () => {
  form.reset()
}

const resetOne = () => {
  form.reset('handle')
}

const reassign = () => {
  form.defaults()
}

const reassignObject = () => {
  form.defaults({
    handle: 'updated handle',
    remember: true,
  })
}

const reassignSingle = () => {
  form.defaults('name', 'single value')
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

    <span @click="resetAll" id="reset">Reset all data</span>
    <span @click="resetOne" id="reset-one">Reset one field</span>

    <span @click="reassign" id="reassign">Reassign current as defaults</span>
    <span @click="reassignObject" id="reassign-object">Reassign default values</span>
    <span @click="reassignSingle" id="reassign-single">Reassign single default</span>

    <span id="errors-status">Form has {{ form.hasErrors ? '' : 'no ' }}errors</span>
  </div>
</template>

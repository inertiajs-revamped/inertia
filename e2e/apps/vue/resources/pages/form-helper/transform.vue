<script setup lang="ts">
import { useForm } from '@inertiajs-revamped/vue'

// Data
const form = useForm({
  name: 'foo',
  remember: false,
})

// Methods
const postForm = () => {
  form
    .transform((data) => ({
      ...data,
      name: 'bar',
    }))
    .post('/dump/post')
}

const putForm = () => {
  form
    .transform((data) => ({
      ...data,
      name: 'baz',
    }))
    .put('/dump/put')
}

const patchForm = () => {
  form
    .transform((data) => ({
      ...data,
      name: 'foo',
    }))
    .patch('/dump/patch')
}

const deleteForm = () => {
  form
    .transform((data) => ({
      ...data,
      name: 'bar',
    }))
    .delete('/dump/delete')
}
</script>

<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="name" v-model="form.name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="form.remember" />
    </label>

    <span @click="postForm" id="post">POST form</span>
    <span @click="putForm" id="put">PUT form</span>
    <span @click="patchForm" id="patch">PATCH form</span>
    <span @click="deleteForm" id="delete">DELETE form</span>
  </div>
</template>

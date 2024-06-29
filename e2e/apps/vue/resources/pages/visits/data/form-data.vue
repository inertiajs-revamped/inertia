<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const visitMethod = () => {
  const formData = new FormData()
  formData.append('foo', 'visit')

  router.visit('/dump/post', {
    method: 'post',
    data: formData,
  })
}

const postMethod = () => {
  const formData = new FormData()
  formData.append('baz', 'post')

  router.post('/dump/post', formData)
}

const putMethod = () => {
  const formData = new FormData()
  formData.append('foo', 'put')

  router.put('/dump/put', formData)
}

const patchMethod = () => {
  const formData = new FormData()
  formData.append('bar', 'patch')

  router.patch('/dump/patch', formData)
}

const deleteMethod = () => {
  const formData = new FormData()
  formData.append('baz', 'delete')

  router.delete('/dump/delete', {
    data: formData,
  })
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates manual visit data passing through FormData objects</span>

    <span @click="visitMethod" id="visit">Visit Link</span>
    <span @click="postMethod" id="post">POST Link</span>
    <span @click="putMethod" id="put">PUT Link</span>
    <span @click="patchMethod" id="patch">PATCH Link</span>
    <span @click="deleteMethod" id="delete">DELETE Link</span>
  </div>
</template>

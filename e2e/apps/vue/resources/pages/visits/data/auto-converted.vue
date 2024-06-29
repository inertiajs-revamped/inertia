<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'
import { reactive } from 'vue'

// Data
const formData = reactive({
  file: new File([], 'example.jpg'),
  foo: 'bar',
})

// Methods
const visitMethod = () => {
  router.visit('/dump/post', {
    method: 'post',
    data: formData,
  })
}

const postMethod = () => {
  router.post('/dump/post', formData)
}

const putMethod = () => {
  router.put('/dump/put', formData)
}

const patchMethod = () => {
  router.patch('/dump/patch', formData)
}

const deleteMethod = () => {
  router.delete('/dump/delete', {
    data: formData,
  })
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates automatic conversion of plain objects to form-data using
      manual visits</span>

    <span @click="visitMethod" id="visit">Visit Link</span>
    <span @click="postMethod" id="post">POST Link</span>
    <span @click="putMethod" id="put">PUT Link</span>
    <span @click="patchMethod" id="patch">PATCH Link</span>
    <span @click="deleteMethod" id="delete">DELETE Link</span>
  </div>
</template>

<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const standardVisitMethod = function () {
  router.visit('/dump/get')
}

const specificVisitMethod = function () {
  router.visit('/dump/patch', {
    method: 'patch',
  })
}

const getMethod = function () {
  router.get('/dump/get')
}

const postMethod = function () {
  router.post('/dump/post')
}

const putMethod = function () {
  router.put('/dump/put')
}

const patchMethod = function () {
  router.patch('/dump/patch')
}

const deleteMethod = function () {
  router.delete('/dump/delete')
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates manual visit methods</span>

    <span @click="standardVisitMethod" id="visit-get">Standard visit Link</span>
    <span @click="specificVisitMethod" id="visit-specific">Specific visit Link</span>
    <span @click="getMethod" id="get">GET Link</span>
    <span @click="postMethod" id="post">POST Link</span>
    <span @click="putMethod" id="put">PUT Link</span>
    <span @click="patchMethod" id="patch">PATCH Link</span>
    <span @click="deleteMethod" id="delete">DELETE Link</span>
  </div>
</template>

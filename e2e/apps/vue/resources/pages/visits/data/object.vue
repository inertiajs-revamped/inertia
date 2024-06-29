<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const visitMethod = () => {
  router.visit('/dump/get', {
    data: { foo: 'visit' },
  })
}

const getMethod = () => {
  router.get('/dump/get', {
    bar: 'get',
  })
}

const postMethod = () => {
  router.post('/dump/post', {
    baz: 'post',
  })
}

const putMethod = () => {
  router.put('/dump/put', {
    foo: 'put',
  })
}

const patchMethod = () => {
  router.patch('/dump/patch', {
    bar: 'patch',
  })
}

const deleteMethod = () => {
  router.delete('/dump/delete', {
    data: { baz: 'delete' },
  })
}

const qsafDefault = () => {
  router.visit('/dump/get', {
    data: { a: ['b', 'c'] },
  })
}

const qsafIndices = () => {
  router.visit('/dump/get', {
    data: { a: ['b', 'c'] },
    queryStringArrayFormat: 'indices',
  })
}

const qsafBrackets = () => {
  router.visit('/dump/get', {
    data: { a: ['b', 'c'] },
    queryStringArrayFormat: 'brackets',
  })
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates manual visit data passing through plain objects</span>

    <span @click="visitMethod" id="visit">Visit Link</span>
    <span @click="getMethod" id="get">GET Link</span>
    <span @click="postMethod" id="post">POST Link</span>
    <span @click="putMethod" id="put">PUT Link</span>
    <span @click="patchMethod" id="patch">PATCH Link</span>
    <span @click="deleteMethod" id="delete">DELETE Link</span>

    <span @click="qsafDefault" id="qsaf-default">QSAF Defaults</span>
    <span @click="qsafIndices" id="qsaf-indices">QSAF Indices</span>
    <span @click="qsafBrackets" id="qsaf-brackets">QSAF Brackets</span>
  </div>
</template>

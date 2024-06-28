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

<script lang="ts">
export default {
  methods: {
    visitMethod() {
      this.$inertia.visit('/dump/get', {
        data: { foo: 'visit' },
      })
    },
    getMethod() {
      this.$inertia.get('/dump/get', {
        bar: 'get',
      })
    },
    postMethod() {
      this.$inertia.post('/dump/post', {
        baz: 'post',
      })
    },
    putMethod() {
      this.$inertia.put('/dump/put', {
        foo: 'put',
      })
    },
    patchMethod() {
      this.$inertia.patch('/dump/patch', {
        bar: 'patch',
      })
    },
    deleteMethod() {
      this.$inertia.delete('/dump/delete', {
        data: { baz: 'delete' },
      })
    },
    qsafDefault() {
      this.$inertia.visit('/dump/get', {
        data: { a: ['b', 'c'] },
      })
    },
    qsafIndices() {
      this.$inertia.visit('/dump/get', {
        data: { a: ['b', 'c'] },
        queryStringArrayFormat: 'indices',
      })
    },
    qsafBrackets() {
      this.$inertia.visit('/dump/get', {
        data: { a: ['b', 'c'] },
        queryStringArrayFormat: 'brackets',
      })
    },
  },
}
</script>

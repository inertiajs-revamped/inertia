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

<script lang="ts">
export default {
  methods: {
    standardVisitMethod() {
      this.$inertia.visit('/dump/get')
    },
    specificVisitMethod() {
      this.$inertia.visit('/dump/patch', {
        method: 'patch',
      })
    },
    getMethod() {
      this.$inertia.get('/dump/get')
    },
    postMethod() {
      this.$inertia.post('/dump/post')
    },
    putMethod() {
      this.$inertia.put('/dump/put')
    },
    patchMethod() {
      this.$inertia.patch('/dump/patch')
    },
    deleteMethod() {
      this.$inertia.delete('/dump/delete')
    },
  },
}
</script>

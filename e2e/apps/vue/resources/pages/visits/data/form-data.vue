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

<script lang="ts">
export default {
  methods: {
    visitMethod() {
      const formData = new FormData()
      formData.append('foo', 'visit')

      this.$inertia.visit('/dump/post', {
        method: 'post',
        data: formData,
      })
    },
    postMethod() {
      const formData = new FormData()
      formData.append('baz', 'post')

      this.$inertia.post('/dump/post', formData)
    },
    putMethod() {
      const formData = new FormData()
      formData.append('foo', 'put')

      this.$inertia.put('/dump/put', formData)
    },
    patchMethod() {
      const formData = new FormData()
      formData.append('bar', 'patch')

      this.$inertia.patch('/dump/patch', formData)
    },
    deleteMethod() {
      const formData = new FormData()
      formData.append('baz', 'delete')

      this.$inertia.delete('/dump/delete', {
        data: formData,
      })
    },
  },
}
</script>

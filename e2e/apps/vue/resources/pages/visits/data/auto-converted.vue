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

<script lang="ts">
export default {
  data: () => ({
    formData: {
      file: new File([], 'example.jpg'),
      foo: 'bar',
    },
  }),
  methods: {
    visitMethod() {
      this.$inertia.visit('/dump/post', {
        method: 'post',
        data: this.formData,
      })
    },
    postMethod() {
      this.$inertia.post('/dump/post', this.formData)
    },
    putMethod() {
      this.$inertia.put('/dump/put', this.formData)
    },
    patchMethod() {
      this.$inertia.patch('/dump/patch', this.formData)
    },
    deleteMethod() {
      this.$inertia.delete('/dump/delete', {
        data: this.formData,
      })
    },
  },
}
</script>

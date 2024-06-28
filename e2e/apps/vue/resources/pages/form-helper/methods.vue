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

<script lang="ts">
export default {
  data() {
    return {
      form: this.$inertia.form({
        name: 'foo',
        remember: false,
      }),
    }
  },
  methods: {
    postForm() {
      this.form.post('/dump/post')
    },
    putForm() {
      this.form.put('/dump/put')
    },
    patchForm() {
      this.form.patch('/dump/patch')
    },
    deleteForm() {
      this.form.delete('/dump/delete')
    },
  },
}
</script>

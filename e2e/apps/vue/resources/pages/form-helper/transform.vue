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
      this.form
        .transform((data) => ({
          ...data,
          name: 'bar',
        }))
        .post('/dump/post')
    },
    putForm() {
      this.form
        .transform((data) => ({
          ...data,
          name: 'baz',
        }))
        .put('/dump/put')
    },
    patchForm() {
      this.form
        .transform((data) => ({
          ...data,
          name: 'foo',
        }))
        .patch('/dump/patch')
    },
    deleteForm() {
      this.form
        .transform((data) => ({
          ...data,
          name: 'bar',
        }))
        .delete('/dump/delete')
    },
  },
}
</script>

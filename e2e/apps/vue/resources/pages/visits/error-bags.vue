<template>
  <div>
    <span id="text">This is the page that demonstrates error bags using manual visits</span>
    <span @click="defaultVisit" id="default">Default visit</span>
    <span @click="basicVisit" id="visit">Basic visit</span>
    <span @click="postVisit" id="get">POST visit</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    defaultVisit() {
      this.$inertia.post('/dump/post')
    },
    basicVisit() {
      this.$inertia.visit('/dump/post', {
        method: 'post',
        data: { foo: 'bar' },
        errorBag: 'visitErrorBag',
      })
    },
    postVisit() {
      this.$inertia.post(
        '/dump/post',
        {
          foo: 'baz',
        },
        {
          errorBag: 'postErrorBag',
        }
      )
    },
  },
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates passing custom headers through manual visits</span>

    <span @click="defaultHeadersMethod" id="default">Standard visit Link</span>

    <span @click="visitWithCustomHeaders" id="visit">Specific visit Link</span>
    <span @click="getMethod" id="get">GET Link</span>
    <span @click="postMethod" id="post">POST Link</span>
    <span @click="putMethod" id="put">PUT Link</span>
    <span @click="patchMethod" id="patch">PATCH Link</span>
    <span @click="deleteMethod" id="delete">DELETE Link</span>

    <span @click="overridden" id="overridden">DELETE Link</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    defaultHeadersMethod() {
      this.$inertia.visit('/dump/get')
    },
    visitWithCustomHeaders() {
      this.$inertia.visit('/dump/get', {
        headers: {
          foo: 'bar',
        },
      })
    },
    getMethod() {
      this.$inertia.get(
        '/dump/get',
        {},
        {
          headers: {
            bar: 'baz',
          },
        }
      )
    },
    postMethod() {
      this.$inertia.post(
        '/dump/post',
        {},
        {
          headers: {
            baz: 'foo',
          },
        }
      )
    },
    putMethod() {
      this.$inertia.put(
        '/dump/put',
        {},
        {
          headers: {
            foo: 'bar',
          },
        }
      )
    },
    patchMethod() {
      this.$inertia.patch(
        '/dump/patch',
        {},
        {
          headers: {
            bar: 'baz',
          },
        }
      )
    },
    deleteMethod() {
      this.$inertia.delete('/dump/delete', {
        headers: {
          baz: 'foo',
        },
      })
    },
    overridden() {
      this.$inertia.post(
        '/dump/post',
        {},
        {
          headers: {
            bar: 'baz',
            'X-Requested-With': 'custom',
          },
        }
      )
    },
  },
}
</script>

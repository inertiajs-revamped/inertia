<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const defaultHeadersMethod = () => {
  router.visit('/dump/get')
}

const visitWithCustomHeaders = () => {
  router.visit('/dump/get', {
    headers: {
      foo: 'bar',
    },
  })
}

const getMethod = () => {
  router.get(
    '/dump/get',
    {},
    {
      headers: {
        bar: 'baz',
      },
    }
  )
}

const postMethod = () => {
  router.post(
    '/dump/post',
    {},
    {
      headers: {
        baz: 'foo',
      },
    }
  )
}

const putMethod = () => {
  router.put(
    '/dump/put',
    {},
    {
      headers: {
        foo: 'bar',
      },
    }
  )
}

const patchMethod = () => {
  router.patch(
    '/dump/patch',
    {},
    {
      headers: {
        bar: 'baz',
      },
    }
  )
}

const deleteMethod = () => {
  router.delete('/dump/delete', {
    headers: {
      baz: 'foo',
    },
  })
}

const overridden = () => {
  router.post(
    '/dump/post',
    {},
    {
      headers: {
        bar: 'baz',
        'X-Requested-With': 'custom',
      },
    }
  )
}
</script>

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

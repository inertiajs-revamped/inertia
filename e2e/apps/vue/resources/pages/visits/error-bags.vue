<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const defaultVisit = () => {
  router.post('/dump/post')
}

const basicVisit = () => {
  router.visit('/dump/post', {
    method: 'post',
    data: { foo: 'bar' },
    errorBag: 'visitErrorBag',
  })
}

const postVisit = () => {
  router.post(
    '/dump/post',
    {
      foo: 'baz',
    },
    {
      errorBag: 'postErrorBag',
    }
  )
}
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates error bags using manual visits</span>
    <span @click="defaultVisit" id="default">Default visit</span>
    <span @click="basicVisit" id="visit">Basic visit</span>
    <span @click="postVisit" id="get">POST visit</span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Data
const linkData = reactive(new FormData())

// Created
linkData.append('bar', 'baz')
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates passing data through FormData objects</span>

    <inertia-link method="GET" href="/dump/get" :data="linkData" id="get">GET Link</inertia-link>
    <inertia-link as="button" method="POST" href="/dump/post" :data="linkData" id="post">POST Link</inertia-link>
    <inertia-link as="button" method="PUT" href="/dump/put" :data="linkData" id="put">PUT Link</inertia-link>
    <inertia-link as="button" method="PATCH" href="/dump/patch" :data="linkData" id="patch">PATCH Link</inertia-link>
    <inertia-link as="button" method="DELETE" href="/dump/delete" :data="linkData" id="delete">DELETE
      Link</inertia-link>
  </div>
</template>

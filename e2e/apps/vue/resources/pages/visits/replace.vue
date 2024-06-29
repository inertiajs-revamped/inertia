<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Methods
const replace = () => {
  router.visit('/dump/get', {
    replace: true,
  })
}

const replaceFalse = () => {
  router.visit('/dump/get', {
    replace: false,
  })
}

const replaceGet = () => {
  router.get(
    '/dump/get',
    {},
    {
      replace: true,
    }
  )
}

const replaceGetFalse = () => {
  router.get(
    '/dump/get',
    {},
    {
      replace: false,
    }
  )
}
</script>

<template>
  <div>
    <span id="text">This is the links page that demonstrates manual replace</span>

    <span @click="replace" id="replace">[State] Replace visit: true</span>
    <span @click="replaceFalse" id="replace-false">[State] Replace visit: false</span>
    <span @click="replaceGet" id="replace-get">[State] Replace GET: true</span>
    <span @click="replaceGetFalse" id="replace-get-false">[State] Replace GET: false</span>
  </div>
</template>

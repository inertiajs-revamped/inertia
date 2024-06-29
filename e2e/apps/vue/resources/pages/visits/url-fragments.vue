<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'
import { onBeforeUnmount, ref } from 'vue'

// Data
const documentScrollTop = ref(0)
const documentScrollLeft = ref(0)

// Methods
const handleScrollEvent = () => {
  documentScrollTop.value = document.documentElement.scrollTop
  documentScrollLeft.value = document.documentElement.scrollLeft
}

const basicVisit = () => {
  router.visit('/visits/url-fragments#target')
}

const fragmentVisit = () => {
  router.visit('#target')
}

const nonExistentFragmentVisit = () => {
  router.visit('/visits/url-fragments#non-existent-fragment')
}

const basicGetVisit = () => {
  router.get('/visits/url-fragments#target')
}

const fragmentGetVisit = () => {
  router.get('#target')
}

const nonExistentFragmentGetVisit = () => {
  router.get('/visits/url-fragments#non-existent-fragment')
}

// Created
document.addEventListener('scroll', handleScrollEvent)

// BeforeDestroy
onBeforeUnmount(() => {
  document.removeEventListener('scroll', handleScrollEvent)
})
</script>

<template>
  <div>
    <span id="text">This is the page that demonstrates url fragment behaviour using manual visits</span>
    <div style="width: 200vw; height: 200vh; margin-top: 50vh">
      <span @click="basicVisit" id="basic">Basic visit</span>
      <span @click="fragmentVisit" id="fragment">Fragment visit</span>
      <span @click="nonExistentFragmentVisit" id="non-existent-fragment-link">Non-existent fragment visit</span>

      <span @click="basicGetVisit" id="basic-get">Basic GET visit</span>
      <span @click="fragmentGetVisit" id="fragment-get">Fragment GET visit</span>
      <span @click="nonExistentFragmentGetVisit" id="non-existent-fragment-get-link">Non-existent fragment visit</span>

      <div id="target">This is the element with id 'target'</div>

      <div id="document-position">Document scroll position is {{ documentScrollLeft }} & {{ documentScrollTop }}</div>
    </div>
  </div>
</template>

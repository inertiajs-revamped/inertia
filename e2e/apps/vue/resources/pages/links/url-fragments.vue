<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

// Data
const documentScrollTop = ref(0)
const documentScrollLeft = ref(0)

// Methods
const handleScrollEvent = function () {
  documentScrollTop.value = document.documentElement.scrollTop
  documentScrollLeft.value = document.documentElement.scrollLeft
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
    <span id="text">This is the links page that demonstrates url fragment behaviour</span>
    <div style="width: 200vw; height: 200vh; margin-top: 50vh">
      <div id="document-position">Document scroll position is {{ documentScrollLeft }} & {{ documentScrollTop }}
      </div>
      <inertia-link href="/links/url-fragments#target" id="basic">Basic link</inertia-link>
      <inertia-link href="#target" id="fragment">Fragment link</inertia-link>
      <inertia-link href="/links/url-fragments#non-existent-fragment" id="non-existent-fragment">Non-existent
        fragment link</inertia-link>

      <div id="target">This is the element with id 'target'</div>
    </div>
  </div>
</template>

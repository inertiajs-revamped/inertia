<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

// Data
const documentScrollTop = ref(0)
const documentScrollLeft = ref(0)
const slotScrollTop = ref(0)
const slotScrollLeft = ref(0)

// Methods
const handleScrollEvent = function () {
  documentScrollTop.value = document.documentElement.scrollTop
  documentScrollLeft.value = document.documentElement.scrollLeft
  slotScrollTop.value = document.getElementById('slot')!.scrollTop
  slotScrollLeft.value = document.getElementById('slot')!.scrollLeft
}

// Created
document.addEventListener('scroll', handleScrollEvent)

// BeforeDestroy
onBeforeUnmount(() => {
  document.removeEventListener('scroll', handleScrollEvent)
})
</script>

<template>
  <div style="width: 200vw">
    <span id="layout-text">Without scroll regions</span>
    <div id="document-position">Document scroll position is {{ documentScrollLeft }} & {{ documentScrollTop }}</div>
    <div style="height: 200vh">
      <span id="slot-position">Slot scroll position is {{ slotScrollLeft }} & {{ slotScrollTop }}</span>
      <div id="slot" style="height: 100px; width: 500px; overflow: scroll" @scroll="handleScrollEvent">
        <slot />
      </div>
    </div>
  </div>
</template>

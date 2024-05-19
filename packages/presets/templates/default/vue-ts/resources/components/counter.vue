<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value = count.value + 1
}
</script>

<template>
  <button type="button" @click="increment">Counter {{ count }}</button>
</template>

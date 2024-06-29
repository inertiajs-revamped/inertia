<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps({
  headers: Object,
  method: String,
  form: Object,
  files: Array,
  query: Object,
})

const dump = computed(() => {
  return {
    headers: props.headers,
    method: props.method,
    form: props.form,
    files: props.files ? props.files : {},
    query: props.query,
  }
})

onMounted(() => {
  window._inertia_request_dump = dump
})
</script>

<template>
  <div>
    <div id="text">This is Inertia page component containing a data dump of the request</div>
    <hr />
    <pre id="dump">{{ dump }}</pre>
  </div>
</template>

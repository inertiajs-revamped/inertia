<template>
  <div>
    <span @click="invalidVisit" id="invalid-visit">Invalid Visit</span>
    <span @click="invalidVisitJson" id="invalid-visit-json">Invalid Visit (JSON response)</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    invalidVisit() {
      this.$inertia.post('/non-inertia')
    },
    invalidVisitJson() {
      this.$inertia.post('/json')
    },
  },
}
</script>

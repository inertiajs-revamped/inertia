<template>
  <div>
    <span id="text">This is the page that demonstrates location visits</span>

    <span @click="locationVisit" id="example">Location visit</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    locationVisit() {
      this.$inertia.get('/location')
    },
  },
}
</script>

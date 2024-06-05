<script setup lang="ts">
import { demoApps } from '@/data/demo-apps'
</script>

<template>
  <div class="demo-container">
    <a v-for="app in demoApps" :class="`demo-item ${app.badge === 'preact' ? 'disabled' : ''}`" :href="app.url"
      target="_blank">
      <Card v-bind="app" />
    </a>
  </div>
</template>

<style>
.demo-container {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1rem;
}

a.demo-item {
  text-decoration: none;
}

a.demo-item.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
</style>

<script setup lang="ts">
import Framework from './Framework.vue'
</script>

<template>
  <div class="grid-container">
    <a class="grid-item" href="/guide/getting-started/quick-start#scaffolding-a-new-project">
      <Framework title="preact" />
    </a>
    <a class="grid-item" href="/guide/getting-started/quick-start#scaffolding-a-new-project">
      <Framework title="react" />
    </a>
    <a class="grid-item" href="/guide/getting-started/quick-start#scaffolding-a-new-project">
      <Framework title="vue" />
    </a>
  </div>
</template>

<style>
.grid-container {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

a.grid-item {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1rem;
  text-decoration: none;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
}

a.grid-item:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}
</style>

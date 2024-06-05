<script setup lang="ts">
export interface DemoApp {
  title: string
  badge: string
  description: string
  integrations: string[]
  image: string
  url: string
}

const props = defineProps<DemoApp>()
</script>

<template>
  <div class="card">
    <img :src="props.image" :alt="props.title">
    <div class="card-item">
      <span class="card-title">
        {{ props.title }}
        <Badge type="info">{{ props.badge }}</Badge>
      </span>
      <span class="card-desc">{{ props.description }}</span>
      <span class="card-footer">
        <span v-for="integration in props.integrations">
          <BaseIcon :iconId="integration" />
        </span>
      </span>
    </div>
  </div>
</template>

<style>
.card {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: var(--vp-c-text-1);
  overflow: hidden;
}

.card:hover .card-item {
  background-color: var(--vp-c-gray-3);
}

.card img {
  filter: brightness(80%);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card:hover img {
  filter: brightness(100%);
}

.card-item {
  border-color: var(--vp-c-border);
  border-style: solid;
  border-width: 1px;
  border-end-end-radius: 8px;
  border-end-start-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.card-desc {
  font-weight: 400;
  color: var(--vp-c-text-2);
  font-size: 15px;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
}
</style>

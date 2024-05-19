<script setup>
import Footer from '@/components/footer.vue'
import Header from '@/components/header.vue'
</script>

<template>
  <Header />
  <main class="container">
    <slot></slot>
  </main>
  <Footer />
</template>

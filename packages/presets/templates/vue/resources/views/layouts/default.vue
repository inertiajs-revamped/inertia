<script setup>
import Footer from '@/views/components/footer.vue'
import Header from '@/views/components/header.vue'
</script>

<template>
  <div>
    <Header />
    <main class="container">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

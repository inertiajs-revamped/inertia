<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Dropdown from '../components/Dropdown.vue'
import Preferences from '../components/Preferences.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <Preferences>
        <ClientOnly>
          <Dropdown />
        </ClientOnly>
      </Preferences>
    </template>
  </Layout>
</template>

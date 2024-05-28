<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Dropdown from '../components/Dropdown.vue'
import Preferences from '../components/Preferences.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <ClientOnly>
        <Preferences>
          <Dropdown />
        </Preferences>
      </ClientOnly>
    </template>
  </Layout>
</template>

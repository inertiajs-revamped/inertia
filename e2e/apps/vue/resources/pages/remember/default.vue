<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="full_name" v-model="data.name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="data.remember" />
    </label>
    <label>
      Untracked
      <input type="text" id="untracked" name="untracked" v-model="data.untracked" />
    </label>

    <inertia-link href="/dump/get" id="link">Navigate away</inertia-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref({
  name: '',
  remember: false,
  untracked: '',
})
</script>

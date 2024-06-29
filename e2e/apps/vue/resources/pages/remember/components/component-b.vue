<template>
  <div>
    <span>This component uses a callback-style 'key' for the remember functionality.</span>
    <label>
      Full Name
      <input type="text" id="b-name" name="full_name" v-model="rememberable.name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="b-remember" name="remember" v-model="rememberable.remember" />
    </label>
    <label>
      Remember Me
      <input type="text" id="b-untracked" name="untracked" v-model="untracked" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useRemember } from '@inertiajs-revamped/vue'
import { ref } from 'vue'

const untracked = ref('')

const rememberable = useRemember(
  {
    name: '',
    remember: false,
  },
  'example/component-b'
)
</script>

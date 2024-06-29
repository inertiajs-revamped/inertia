<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="full_name" v-model="rememberable.name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="rememberable.remember" />
    </label>
    <label>
      Untracked
      <input type="text" id="untracked" name="untracked" />
    </label>

    <ComponentA id="component-a" />
    <ComponentB id="component-b" />

    <inertia-link href="/dump/get" id="link">Navigate away</inertia-link>
    <a href="/non-inertia" id="off-site">Navigate off-site</a>
  </div>
</template>

<script setup lang="ts">
import { useRemember } from '@inertiajs-revamped/vue'

import ComponentA from '../remember/components/component-a.vue'
import ComponentB from '../remember/components/component-b.vue'

const rememberable = useRemember(
  {
    name: '',
    remember: false,
  },
  'remember/multiple-components'
)
</script>

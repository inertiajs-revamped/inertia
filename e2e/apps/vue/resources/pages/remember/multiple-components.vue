<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="name" v-model="name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="remember" />
    </label>
    <label>
      Untracked
      <input type="text" id="untracked" name="untracked" v-model="untracked" />
    </label>

    <component-a class="component-a" />
    <component-b class="component-b" />

    <inertia-link href="/dump/get" id="link">Navigate away</inertia-link>
    <a href="/non-inertia" id="off-site">Navigate off-site</a>
  </div>
</template>

<script lang="ts">
import ComponentA from '../remember/components/component-a.vue'
import ComponentB from '../remember/components/component-b.vue'

export default {
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB,
  },
  remember: {
    data: ['name', 'remember'],
    key: 'remember/multiple-components',
  },
  data: () => ({
    name: '',
    remember: false,
    untracked: '',
  }),
}
</script>

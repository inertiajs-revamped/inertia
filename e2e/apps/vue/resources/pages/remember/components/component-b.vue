<template>
  <div>
    <span>This component uses a callback-style 'key' for the remember functionality.</span>
    <label>
      Full Name
      <input type="text" id="b-name" name="name" v-model="name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="b-remember" name="remember" v-model="remember" />
    </label>
    <label>
      Remember Me
      <input type="text" id="b-untracked" name="untracked" v-model="untracked" />
    </label>
  </div>
</template>

<script lang="ts">
export default {
  remember: {
    data: ['name', 'remember'],
    key: () => 'remember/component-b',
  },
  data: () => ({
    name: '',
    remember: false,
    untracked: '',
  }),
}
</script>

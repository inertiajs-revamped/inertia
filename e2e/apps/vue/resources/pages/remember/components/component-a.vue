<template>
  <div>
    <span>This component uses a string 'key' for the remember functionality.</span>
    <label>
      Full Name
      <input type="text" id="a-name" name="name" v-model="name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="a-remember" name="remember" v-model="remember" />
    </label>
    <label>
      Remember Me
      <input type="text" id="a-untracked" name="untracked" v-model="untracked" />
    </label>
  </div>
</template>

<script lang="ts">
export default {
  remember: {
    data: ['name', 'remember'],
    key: 'remember/component-a',
  },
  data: () => ({
    name: '',
    remember: false,
    untracked: '',
  }),
}
</script>

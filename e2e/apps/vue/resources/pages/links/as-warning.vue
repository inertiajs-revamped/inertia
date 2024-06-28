<template>
  <div>
    <span id="text">This is the links page that demonstrates inertia-links with an 'as' warning</span>

    <inertia-link :method="method" href="/example" id="get">{{ method }} Link</inertia-link>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    method: String,
  },
}
</script>

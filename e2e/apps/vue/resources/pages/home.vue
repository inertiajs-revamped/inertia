<template>
  <div>
    <span id="text">This is the Test App Entrypoint page</span>

    <inertia-link href="/links/method" id="links-method">Basic inertia-links</inertia-link>
    <inertia-link href="/links/replace" id="links-replace">'Replace' inertia-links</inertia-link>

    <span @click="visitsMethod" id="visits-method">Manual basic visits</span>
    <span @click="visitsReplace" id="visits-replace">Manual 'Replace' visits</span>

    <inertia-link href="/redirect" method="post" id="links-redirect">Redirect Link</inertia-link>
    <span @click="redirect" id="visits-redirect">Manual Redirect visit</span>

    <inertia-link href="/redirect-external" method="post" id="links-redirect-external">Redirect Link</inertia-link>
    <span @click="redirectExternal" id="visits-redirect-external">Manual External Redirect visit</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    visitsMethod() {
      this.$inertia.visit('/visits/method')
    },
    visitsReplace() {
      this.$inertia.get('/visits/replace')
    },
    redirect() {
      this.$inertia.post('/redirect')
    },
    redirectExternal() {
      this.$inertia.post('/redirect-external')
    },
  },
}
</script>

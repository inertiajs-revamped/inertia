<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

const visitsMethod = () => {
  router.visit('/visits/method')
}

const visitsReplace = () => {
  router.get('/visits/replace')
}

const redirect = () => {
  router.post('/redirect')
}

const redirectExternal = () => {
  router.post('/redirect-external')
}
</script>

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

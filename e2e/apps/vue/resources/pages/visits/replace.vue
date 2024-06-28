<template>
  <div>
    <span id="text">This is the links page that demonstrates manual replace</span>

    <span @click="replace" id="replace">[State] Replace visit: true</span>
    <span @click="replaceFalse" id="replace-false">[State] Replace visit: false</span>
    <span @click="replaceGet" id="replace-get">[State] Replace GET: true</span>
    <span @click="replaceGetFalse" id="replace-get-false">[State] Replace GET: false</span>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    replace() {
      this.$inertia.visit('/dump/get', {
        replace: true,
      })
    },
    replaceFalse() {
      this.$inertia.visit('/dump/get', {
        replace: false,
      })
    },
    replaceGet() {
      this.$inertia.get(
        '/dump/get',
        {},
        {
          replace: true,
        }
      )
    },
    replaceGetFalse() {
      this.$inertia.get(
        '/dump/get',
        {},
        {
          replace: false,
        }
      )
    },
  },
}
</script>

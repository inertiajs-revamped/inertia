<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="name" v-model="form.name" />
    </label>
    <span id="name_error" v-if="form.errors.name">{{ form.errors.name }}</span>
    <label>
      Handle
      <input type="text" id="handle" name="handle" v-model="form.handle" />
    </label>
    <span id="handle_error" v-if="form.errors.handle">{{ form.errors.handle }}</span>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="form.remember" />
    </label>
    <span id="remember_error" v-if="form.errors.remember">{{ form.errors.remember }}</span>

    <span @click="submit" id="submit">Submit form</span>

    <span @click="resetAll" id="reset">Reset all data</span>
    <span @click="resetOne" id="reset-one">Reset one field</span>

    <span @click="reassign" id="reassign">Reassign current as defaults</span>
    <span @click="reassignObject" id="reassign-object">Reassign default values</span>
    <span @click="reassignSingle" id="reassign-single">Reassign single default</span>

    <span id="errors-status">Form has {{ form.hasErrors ? '' : 'no ' }}errors</span>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: this.$inertia.form({
        name: 'foo',
        handle: 'example',
        remember: false,
      }),
    }
  },
  methods: {
    submit() {
      this.form.post(this.$page.url)
    },
    resetAll() {
      this.form.reset()
    },
    resetOne() {
      this.form.reset('handle')
    },
    reassign() {
      this.form.defaults()
    },
    reassignObject() {
      this.form.defaults({
        handle: 'updated handle',
        remember: true,
      })
    },
    reassignSingle() {
      this.form.defaults('name', 'single value')
    },
  },
}
</script>

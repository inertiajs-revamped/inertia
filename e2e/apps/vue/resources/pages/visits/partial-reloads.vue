<template>
  <div>
    <span id="text">This is the page that demonstrates partial reloads using manual visits</span>
    <span id="foo-text">Foo is now {{ foo }}</span>
    <span id="bar-text">Bar is now {{ bar }}</span>
    <span id="baz-text">Baz is now {{ baz }}</span>
    <pre id="headers">{{ headers }}</pre>

    <span @click="partialReloadVisit" id="visit">Update All (visit)</span>
    <span @click="partialReloadVisitFooBar" id="visit-foo-bar">'Only' foo + bar (visit)</span>
    <span @click="partialReloadVisitBaz" id="visit-baz">'Only' baz (visit)</span>
    <span @click="partialReloadVisitExceptFooBar" id="visit-except-foo-bar">'Except' foo + bar (visit)</span>
    <span @click="partialReloadVisitExceptBaz" id="visit-except-baz">'Except' baz (visit)</span>

    <span @click="partialReloadGet" id="get">Update All (GET)</span>
    <span @click="partialReloadGetFooBar" id="get-foo-bar">'Only' foo + bar (GET)</span>
    <span @click="partialReloadGetBaz" id="get-baz">'Only' baz (GET)</span>
    <span @click="partialReloadGetExceptFooBar" id="get-except-foo-bar">'Except' foo + bar (GET)</span>
    <span @click="partialReloadGetExceptBaz" id="get-except-baz">'Except' baz (GET)</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    foo: {
      type: Number,
      default: 0,
    },
    bar: Number,
    baz: Number,
    headers: Object,
  },
  created() {
    window._inertia_props = this.$page.props
  },
  methods: {
    partialReloadVisit() {
      this.$inertia.visit('/visits/partial-reloads', {
        data: { foo: this.foo },
      })
    },
    partialReloadVisitFooBar() {
      this.$inertia.visit('/visits/partial-reloads', {
        data: { foo: this.foo },
        only: ['headers', 'foo', 'bar'],
      })
    },
    partialReloadVisitBaz() {
      this.$inertia.visit('/visits/partial-reloads', {
        data: { foo: this.foo },
        only: ['headers', 'baz'],
      })
    },
    partialReloadVisitExceptFooBar() {
      this.$inertia.visit('/visits/partial-reloads', {
        data: { foo: this.foo },
        except: ['foo', 'bar'],
      })
    },
    partialReloadVisitExceptBaz() {
      this.$inertia.visit('/visits/partial-reloads', {
        data: { foo: this.foo },
        except: ['baz'],
      })
    },
    partialReloadGet() {
      this.$inertia.get('/visits/partial-reloads', {
        foo: this.foo,
      })
    },
    partialReloadGetFooBar() {
      this.$inertia.get(
        '/visits/partial-reloads',
        {
          foo: this.foo,
        },
        {
          only: ['headers', 'foo', 'bar'],
        }
      )
    },
    partialReloadGetBaz() {
      this.$inertia.get(
        '/visits/partial-reloads',
        {
          foo: this.foo,
        },
        {
          only: ['headers', 'baz'],
        }
      )
    },
    partialReloadGetExceptFooBar() {
      this.$inertia.get(
        '/visits/partial-reloads',
        {
          foo: this.foo,
        },
        {
          except: ['foo', 'bar'],
        }
      )
    },
    partialReloadGetExceptBaz() {
      this.$inertia.get(
        '/visits/partial-reloads',
        {
          foo: this.foo,
        },
        {
          except: ['baz'],
        }
      )
    },
  },
}
</script>

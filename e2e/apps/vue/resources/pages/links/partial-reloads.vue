<template>
  <div>
    <span id="text">This is the links page that demonstrates partial reloads</span>
    <span id="foo-text">Foo is now {{ foo }}</span>
    <span id="bar-text">Bar is now {{ bar }}</span>
    <span id="baz-text">Baz is now {{ baz }}</span>
    <pre id="headers">{{ headers }}</pre>

    <inertia-link href="/links/partial-reloads" :data="{ foo }" id="all">Update All</inertia-link>
    <inertia-link href="/links/partial-reloads" :only="['headers', 'foo', 'bar']" :data="{ foo }" id="foo-bar">'Only'
      foo + bar</inertia-link>
    <inertia-link href="/links/partial-reloads" :only="['headers', 'baz']" :data="{ foo }" id="baz">'Only'
      baz</inertia-link>
    <inertia-link href="/links/partial-reloads" :except="['foo', 'bar']" :data="{ foo }" id="except-foo-bar">'Except'
      foo + bar</inertia-link>
    <inertia-link href="/links/partial-reloads" :except="['baz']" :data="{ foo }" id="except-baz">'Except'
      baz</inertia-link>
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
}
</script>

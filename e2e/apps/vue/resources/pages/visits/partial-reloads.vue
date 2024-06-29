<script setup lang="ts">
import { router } from '@inertiajs-revamped/vue'

// Props
const props = defineProps({
  foo: {
    type: Number,
    default: 0,
  },
  bar: Number,
  baz: Number,
  headers: Object,
})

// Methods
const partialReloadVisit = function () {
  router.visit('/visits/partial-reloads', {
    data: { foo: props.foo },
  })
}

const partialReloadVisitFooBar = function () {
  router.visit('/visits/partial-reloads', {
    data: { foo: props.foo },
    only: ['headers', 'foo', 'bar'],
  })
}

const partialReloadVisitBaz = function () {
  router.visit('/visits/partial-reloads', {
    data: { foo: props.foo },
    only: ['headers', 'baz'],
  })
}

const partialReloadVisitExceptFooBar = function () {
  router.visit('/visits/partial-reloads', {
    data: { foo: props.foo },
    except: ['foo', 'bar'],
  })
}

const partialReloadVisitExceptBaz = function () {
  router.visit('/visits/partial-reloads', {
    data: { foo: props.foo },
    except: ['baz'],
  })
}

const partialReloadGet = function () {
  router.get('/visits/partial-reloads', {
    foo: props.foo,
  })
}

const partialReloadGetFooBar = function () {
  router.get(
    '/visits/partial-reloads',
    {
      foo: props.foo,
    },
    {
      only: ['headers', 'foo', 'bar'],
    }
  )
}

const partialReloadGetBaz = function () {
  router.get(
    '/visits/partial-reloads',
    {
      foo: props.foo,
    },
    {
      only: ['headers', 'baz'],
    }
  )
}

const partialReloadGetExceptFooBar = function () {
  router.get(
    '/visits/partial-reloads',
    {
      foo: props.foo,
    },
    {
      except: ['foo', 'bar'],
    }
  )
}

const partialReloadGetExceptBaz = function () {
  router.get(
    '/visits/partial-reloads',
    {
      foo: props.foo,
    },
    {
      except: ['baz'],
    }
  )
}

// Created
// !!! window._inertia_props = this.$page.props
</script>

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

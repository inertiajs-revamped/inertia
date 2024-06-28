<template>
  <div>
    <span id="text">This is the links page that demonstrates url fragment behaviour</span>
    <div style="width: 200vw; height: 200vh; margin-top: 50vh">
      <!-- prettier-ignore -->
      <div id="document-position">Document scroll position is {{ documentScrollLeft }} & {{ documentScrollTop }}
      </div>
      <inertia-link href="/links/url-fragments#target" id="basic">Basic link</inertia-link>
      <inertia-link href="#target" id="fragment">Fragment link</inertia-link>
      <inertia-link href="/links/url-fragments#non-existent-fragment" id="non-existent-fragment">Non-existent
        fragment link</inertia-link>

      <div id="target">This is the element with id 'target'</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    documentScrollTop: 0,
    documentScrollLeft: 0,
  }),
  created() {
    document.addEventListener('scroll', this.handleScrollEvent)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScrollEvent)
  },
  methods: {
    handleScrollEvent() {
      this.documentScrollTop = document.documentElement.scrollTop
      this.documentScrollLeft = document.documentElement.scrollLeft
    },
  },
}
</script>

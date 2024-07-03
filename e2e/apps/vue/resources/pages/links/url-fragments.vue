<template>
  <div>
    <span id="text">This is the links page that demonstrates url fragment behaviour</span>
    <div style="width: 200vw; height: 200vh; margin-top: 50vh">
      <inertia-link href="/links/url-fragments#target" id="basic">Basic link</inertia-link>
      <inertia-link href="#target" id="fragment">Fragment link</inertia-link>
      <inertia-link href="/links/url-fragments#non-existent-fragment" id="non-existent-fragment-link">Non-existent
        fragment link</inertia-link>

      <div id="target">This is the element with id 'target'</div>
    </div>
  </div>
</template>

<template>
  <div>
    <span id="text">This is the links page that demonstrates replace on inertia-links</span>

    <inertia-link href="/dump/get" replace id="replace">[State] Replace: true</inertia-link>
    <inertia-link href="/dump/get" :replace="false" id="replace-false">[State] Replace: false</inertia-link>
  </div>
</template>

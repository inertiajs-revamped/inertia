<template>
  <div>
    <span id="text">This is the links page that demonstrates inertia-link methods</span>

    <inertia-link method="GET" href="/dump/get" id="get">GET Link</inertia-link>
    <inertia-link as="button" method="POST" href="/dump/post" id="post">POST Link</inertia-link>
    <inertia-link as="button" method="PUT" href="/dump/put" id="put">PUT Link</inertia-link>
    <inertia-link as="button" method="PATCH" href="/dump/patch" id="patch">PATCH Link</inertia-link>
    <inertia-link as="button" method="DELETE" href="/dump/delete" id="delete">DELETE Link</inertia-link>
  </div>
</template>

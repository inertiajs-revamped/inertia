<template>
  <div>
    <span id="text">This is the links page that demonstrates passing data through plain objects</span>

    <inertia-link method="GET" href="/dump/get" :data="{ foo: 'get' }" id="get">GET Link</inertia-link>
    <inertia-link as="button" method="POST" href="/dump/post" :data="{ bar: 'post' }" id="post">POST
      Link</inertia-link>
    <inertia-link as="button" method="PUT" href="/dump/put" :data="{ baz: 'put' }" id="put">PUT Link</inertia-link>
    <inertia-link as="button" method="PATCH" href="/dump/patch" :data="{ foo: 'patch' }" id="patch">PATCH
      Link</inertia-link>
    <inertia-link as="button" method="DELETE" href="/dump/delete" :data="{ bar: 'delete' }" id="delete">DELETE
      Link</inertia-link>

    <inertia-link href="/dump/get" :data="{ a: ['b', 'c'] }" id="qsaf-default">QSAF Defaults</inertia-link>
    <inertia-link href="/dump/get" :data="{ a: ['b', 'c'] }" queryStringArrayFormat="indices" id="qsaf-indices">QSAF
      Indices</inertia-link>
    <inertia-link href="/dump/get" :data="{ a: ['b', 'c'] }" queryStringArrayFormat="brackets" id="qsaf-brackets">QSAF
      Brackets</inertia-link>
  </div>
</template>

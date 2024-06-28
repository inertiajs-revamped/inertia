import { router } from '@inertiajs-revamped/react'

export default function () {
  const visitMethod = () => {
    router.visit('/dump/get', {
      data: { foo: 'visit' },
    })
  }

  const getMethod = () => {
    router.get('/dump/get', {
      bar: 'get',
    })
  }

  const postMethod = () => {
    router.post('/dump/post', {
      baz: 'post',
    })
  }

  const putMethod = () => {
    router.put('/dump/put', {
      foo: 'put',
    })
  }

  const patchMethod = () => {
    router.patch('/dump/patch', {
      bar: 'patch',
    })
  }

  const deleteMethod = () => {
    router.delete('/dump/delete', {
      data: { baz: 'delete' },
    })
  }

  const qsafDefault = () => {
    router.visit('/dump/get', {
      data: { a: ['b', 'c'] },
    })
  }

  const qsafIndices = () => {
    router.visit('/dump/get', {
      data: { a: ['b', 'c'] },
      queryStringArrayFormat: 'indices',
    })
  }

  const qsafBrackets = () => {
    router.visit('/dump/get', {
      data: { a: ['b', 'c'] },
      queryStringArrayFormat: 'brackets',
    })
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates manual visit data passing through
        plain objects
      </span>

      <span onClick={visitMethod} id="visit">
        Visit Link
      </span>
      <span onClick={getMethod} id="get">
        GET Link
      </span>
      <span onClick={postMethod} id="post">
        POST Link
      </span>
      <span onClick={putMethod} id="put">
        PUT Link
      </span>
      <span onClick={patchMethod} id="patch">
        PATCH Link
      </span>
      <span onClick={deleteMethod} id="delete">
        DELETE Link
      </span>

      <span onClick={qsafDefault} id="qsaf-default">
        QSAF Defaults
      </span>
      <span onClick={qsafIndices} id="qsaf-indices">
        QSAF Indices
      </span>
      <span onClick={qsafBrackets} id="qsaf-brackets">
        QSAF Brackets
      </span>
    </>
  )
}

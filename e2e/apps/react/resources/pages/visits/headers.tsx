import { router } from '@inertiajs-revamped/react'

export default function () {
  const defaultHeadersMethod = () => {
    router.visit('/dump/get')
  }

  const visitWithCustomHeaders = () => {
    router.visit('/dump/get', {
      headers: {
        foo: 'bar',
      },
    })
  }

  const getMethod = () => {
    router.get(
      '/dump/get',
      {},
      {
        headers: {
          bar: 'baz',
        },
      }
    )
  }

  const postMethod = () => {
    router.post(
      '/dump/post',
      {},
      {
        headers: {
          baz: 'foo',
        },
      }
    )
  }

  const putMethod = () => {
    router.put(
      '/dump/put',
      {},
      {
        headers: {
          foo: 'bar',
        },
      }
    )
  }

  const patchMethod = () => {
    router.patch(
      '/dump/patch',
      {},
      {
        headers: {
          bar: 'baz',
        },
      }
    )
  }

  const deleteMethod = () => {
    router.delete('/dump/delete', {
      headers: {
        baz: 'foo',
      },
    })
  }

  const overridden = () => {
    router.post(
      '/dump/post',
      {},
      {
        headers: {
          bar: 'baz',
          'X-Requested-With': 'custom',
        },
      }
    )
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates passing custom headers through manual
        visits
      </span>

      <span onClick={defaultHeadersMethod} id="default">
        Standard visit Link
      </span>

      <span onClick={visitWithCustomHeaders} id="visit">
        Specific visit Link
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

      <span onClick={overridden} id="overridden">
        DELETE Link
      </span>
    </>
  )
}

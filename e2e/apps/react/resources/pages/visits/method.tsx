import { router } from '@inertiajs-revamped/react'

export default function () {
  const standardVisitMethod = () => {
    router.visit('/dump/get')
  }

  const specificVisitMethod = () => {
    router.visit('/dump/patch', {
      method: 'patch',
    })
  }

  const getMethod = () => {
    router.get('/dump/get')
  }

  const postMethod = () => {
    router.post('/dump/post')
  }

  const putMethod = () => {
    router.put('/dump/put')
  }

  const patchMethod = () => {
    router.patch('/dump/patch')
  }

  const deleteMethod = () => {
    router.delete('/dump/delete')
  }
  return (
    <>
      <span id="text">
        This is the page that demonstrates manual visit methods
      </span>

      <span onClick={standardVisitMethod} id="visit-get">
        Standard visit Link
      </span>
      <span onClick={specificVisitMethod} id="visit-specific">
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
    </>
  )
}

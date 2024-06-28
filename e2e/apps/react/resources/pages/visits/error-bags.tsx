import { router } from '@inertiajs-revamped/react'

export default function () {
  const defaultVisit = () => {
    router.post('/dump/post')
  }

  const basicVisit = () => {
    router.visit('/dump/post', {
      method: 'post',
      data: { foo: 'bar' },
      errorBag: 'visitErrorBag',
    })
  }

  const postVisit = () => {
    router.post(
      '/dump/post',
      {
        foo: 'baz',
      },
      {
        errorBag: 'postErrorBag',
      }
    )
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates error bags using manual visits
      </span>
      <span onClick={defaultVisit} id="default">
        Default visit
      </span>
      <span onClick={basicVisit} id="visit">
        Basic visit
      </span>
      <span onClick={postVisit} id="get">
        POST visit
      </span>
    </>
  )
}

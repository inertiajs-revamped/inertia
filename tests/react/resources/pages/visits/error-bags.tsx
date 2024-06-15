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
      <span className="text">
        This is the page that demonstrates error bags using manual visits
      </span>
      <span onClick={defaultVisit} className="default">
        Default visit
      </span>
      <span onClick={basicVisit} className="visit">
        Basic visit
      </span>
      <span onClick={postVisit} className="get">
        POST visit
      </span>
    </>
  )
}

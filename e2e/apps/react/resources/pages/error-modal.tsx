import { router } from '@inertiajs-revamped/react'

export default function () {
  const invalidVisit = () => {
    router.post('/non-inertia')
  }

  const invalidVisitJson = () => {
    router.post('/json')
  }

  return (
    <>
      <span onClick={invalidVisit} id="invalid-visit">
        Invalid Visit
      </span>
      <span onClick={invalidVisitJson} id="invalid-visit-json">
        Invalid Visit (JSON response)
      </span>
    </>
  )
}

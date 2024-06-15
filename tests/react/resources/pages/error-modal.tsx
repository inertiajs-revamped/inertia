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
      <span onClick={invalidVisit} className="invalid-visit">
        Invalid Visit
      </span>
      <span onClick={invalidVisitJson} className="invalid-visit-json">
        Invalid Visit (JSON response)
      </span>
    </>
  )
}

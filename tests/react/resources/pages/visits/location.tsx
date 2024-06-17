import { router } from '@inertiajs-revamped/react'

export default function () {
  const locationVisit = () => {
    router.get('/location')
  }
  return (
    <>
      <span className="text">
        This is the page that demonstrates location visits
      </span>

      <span onClick={locationVisit} className="example">
        Location visit
      </span>
    </>
  )
}

import { router } from '@inertiajs-revamped/react'

export default function () {
  const locationVisit = () => {
    router.get('/location')
  }
  return (
    <>
      <span id="text">This is the page that demonstrates location visits</span>

      <span onClick={locationVisit} id="example">
        Location visit
      </span>
    </>
  )
}

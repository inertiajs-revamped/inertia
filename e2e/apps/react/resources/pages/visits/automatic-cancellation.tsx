import { router } from '@inertiajs-revamped/react'

export default function () {
  const visit = () => {
    router.get(
      '/sleep',
      {},
      {
        onStart: () => alert('started'),
        onCancel: () => alert('cancelled'),
      }
    )
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates that only one visit can be active at
        a time
      </span>
      <span onClick={visit} id="visit">
        Link
      </span>
    </>
  )
}

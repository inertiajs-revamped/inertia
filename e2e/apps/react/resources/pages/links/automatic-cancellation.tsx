import { Link } from '@inertiajs-revamped/react'

export default function () {
  const alert = (message: string) => {
    return window.alert(message)
  }

  return (
    <>
      <span id="text">
        This is the links page that demonstrates that only one visit can be
        active at a time
      </span>

      <Link
        href="/sleep"
        id="visit"
        onCancel={() => alert('cancelled')}
        onStart={() => alert('started')}
      >
        Link
      </Link>
    </>
  )
}

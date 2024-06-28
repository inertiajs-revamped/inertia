import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates location visits inertia-links
      </span>

      <Link href="/location" id="example" replace>
        Location visit
      </Link>
    </>
  )
}

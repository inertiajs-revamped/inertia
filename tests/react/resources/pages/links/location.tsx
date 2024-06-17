import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span className="text">
        This is the links page that demonstrates location visits inertia-links
      </span>

      <Link href="/location" className="example" replace>
        Location visit
      </Link>
    </>
  )
}

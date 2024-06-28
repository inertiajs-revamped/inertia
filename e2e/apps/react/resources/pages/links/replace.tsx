import { Link } from '@inertiajs-revamped/react'

export default function Replace() {
  return (
    <div>
      <span id="text">
        This is the links page that demonstrates replace on Links
      </span>

      <Link href="/dump/get" id="replace" replace>
        [State] Replace: true
      </Link>
      <Link href="/dump/get" id="replace-false" replace={false}>
        [State] Replace: false
      </Link>
    </div>
  )
}

import { Link } from '@inertiajs-revamped/react'

export default function Replace() {
  return (
    <div>
      <span className="text">
        This is the links page that demonstrates replace on Links
      </span>

      <Link href="/dump/get" className="replace" replace>
        [State] Replace: true
      </Link>
      <Link href="/dump/get" className="replace-false" replace={false}>
        [State] Replace: false
      </Link>
    </div>
  )
}

import { Link } from '@inertiajs-revamped/react'

export default function () {
  return (
    <>
      <span id="text">
        This is the links page that demonstrates url fragment behaviour
      </span>

      <div style={{ width: '200vw', height: '200vh', marginTop: '50vh' }}>
        <Link href="/links/url-fragments#target" id="basic">
          Basic link
        </Link>
        <Link href="#target" id="fragment">
          Fragment link
        </Link>
        <Link
          href="/links/url-fragments#non-existent-fragment"
          id="non-existent-fragment-link"
        >
          Non-existent fragment link
        </Link>

        <div id="target">This is the element with id 'target'</div>
      </div>
    </>
  )
}

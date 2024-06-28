import { Link } from '@inertiajs-revamped/react'
import NestedLayout from '../../../../layouts/nested-layout'
import SiteLayout from '../../../../layouts/site-layout'

function PageA() {
  return (
    <>
      <span id="text">Nested Persistent Layout - Page A</span>
      <Link href="/persistent-layouts/render-function/nested/page-b">
        Page B
      </Link>
    </>
  )
}

PageA.layout = [SiteLayout, NestedLayout]

export default PageA

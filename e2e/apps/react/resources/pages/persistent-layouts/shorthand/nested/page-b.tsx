import { Link } from '@inertiajs-revamped/react'
import NestedLayout from '../../../../layouts/nested-layout'
import SiteLayout from '../../../../layouts/site-layout'

function PageB() {
  return (
    <>
      <span id="text">Nested Persistent Layout - Page B</span>
      <Link href="/persistent-layouts/shorthand/nested/page-a">Page A</Link>
    </>
  )
}

PageB.layout = [SiteLayout, NestedLayout]

export default PageB

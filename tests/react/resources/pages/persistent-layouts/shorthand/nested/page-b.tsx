import { Link, withLayout } from '@inertiajs-revamped/react'
import NestedLayout from '../../../../layouts/nested-layout'
import SiteLayout from '../../../../layouts/site-layout'

function PageB() {
  return (
    <>
      <span className="text">Nested Persistent Layout - Page B</span>
      <Link href="/persistent-layouts/shorthand/nested/page-a">Page A</Link>
    </>
  )
}

PageB.layout = [withLayout(SiteLayout), withLayout(NestedLayout)]

export default PageB

import { Link, withLayout } from '@inertiajs-revamped/react'
import NestedLayout from '../../../../layouts/nested-layout'
import SiteLayout from '../../../../layouts/site-layout'

function PageA() {
  return (
    <>
      <span className="text">Nested Persistent Layout - Page A</span>
      <Link href="/persistent-layouts/shorthand/nested/page-b">Page B</Link>
    </>
  )
}

PageA.layout = [withLayout(SiteLayout), withLayout(NestedLayout)]

export default PageA

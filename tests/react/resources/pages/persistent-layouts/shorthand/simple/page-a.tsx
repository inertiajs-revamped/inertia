import { Link, withLayout } from '@inertiajs-revamped/react'
import SiteLayout from '../../../../layouts/site-layout'

function SimplePageA() {
  return (
    <>
      <span className="text">Simple Persistent Layout - Page A</span>
      <Link href="/persistent-layouts/shorthand/simple/page-b">Page B</Link>
    </>
  )
}

SimplePageA.layout = withLayout(SiteLayout)

export default SimplePageA

import { Link, withLayout } from '@inertiajs-revamped/react'
import SiteLayout from '../../../../layouts/site-layout'

function SimplePageB() {
  return (
    <>
      <span className="text">Simple Persistent Layout - Page B</span>
      <Link href="/persistent-layouts/shorthand/simple/page-a">Page A</Link>
    </>
  )
}

SimplePageB.layout = withLayout(SiteLayout)

export default SimplePageB

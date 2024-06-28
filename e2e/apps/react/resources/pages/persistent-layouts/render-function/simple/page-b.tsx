import { Link, withLayout } from '@inertiajs-revamped/react'
import SiteLayout from '../../../../layouts/site-layout'

function SimplePageB() {
  return (
    <>
      <span id="text">Simple Persistent Layout - Page B</span>
      <Link href="/persistent-layouts/render-function/simple/page-a">
        Page A
      </Link>
    </>
  )
}

SimplePageB.layout = withLayout(SiteLayout)

export default SimplePageB

import { Link, withLayout } from '@inertiajs-revamped/react'
import SiteLayout from '../../../../layouts/site-layout'

function SimplePageA() {
  return (
    <>
      <span id="text">Simple Persistent Layout - Page A</span>
      <Link href="/persistent-layouts/render-function/simple/page-b">
        Page B
      </Link>
    </>
  )
}

SimplePageA.layout = withLayout(SiteLayout)

export default SimplePageA

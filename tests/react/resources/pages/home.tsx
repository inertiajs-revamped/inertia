import { Head, Link, router } from '@inertiajs-revamped/react'

export default function () {
  const visitsMethod = () => {
    router.visit('/visits/method')
  }
  const visitsReplace = () => {
    router.get('/visits/replace')
  }
  const redirect = () => {
    router.post('/redirect')
  }
  const redirectExternal = () => {
    router.post('/redirect-external')
  }
  return (
    <>
      <Head title="Home" />

      <span className="text">This is the Test App Entrypoint page</span>

      <Link href="/links/method" as="button" className="links-method">
        Basic Links
      </Link>
      <Link href="/links/replace" as="button" className="links-replace">
        'Replace' Links
      </Link>

      <span onClick={visitsMethod} className="visits-method">
        Manual basic visits
      </span>
      <span onClick={visitsReplace} className="visits-replace">
        Manual 'Replace' visits
      </span>

      <Link
        href="/redirect"
        method="post"
        as="button"
        className="links-redirect"
      >
        Redirect Link
      </Link>
      <span onClick={redirect} className="visits-redirect">
        Manual Redirect visit
      </span>

      <Link
        href="/redirect-external"
        method="post"
        as="button"
        className="links-redirect-external"
      >
        Redirect Link
      </Link>
      <span onClick={redirectExternal} className="visits-redirect-external">
        Manual External Redirect visit
      </span>
    </>
  )
}

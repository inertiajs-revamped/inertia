// @ts-nocheck
import Layout from '@/layouts/layout'
import { Head, withLayout } from '@inertiajs-revamped/react'

function Index() {
  return (
    <>
      <Head title="Reports" />
      <h1 className="mb-8 text-3xl font-bold">Reports</h1>
    </>
  )
}

Index.layout = withLayout(Layout)

export default Index

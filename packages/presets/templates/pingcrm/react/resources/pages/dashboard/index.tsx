// @ts-nocheck
import Layout from '@/layouts/layout'
import { Head, Link, withLayout } from '@inertiajs-revamped/react'

function Index() {
  return (
    <>
      <Head title="Dashboard" />
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8 leading-normal">
        Hey there! Welcome to Ping CRM, a demo app designed to help illustrate
        how{' '}
        <a
          className="text-indigo-500 hover:text-orange-600 underline"
          href="https://inertiajs-revamped.com/"
        >
          Inertia.js-Revamped
        </a>{' '}
        works.
      </p>
      <div className="flex mb-8">
        <Link className="btn-indigo mr-1" href="/500">
          500 error
        </Link>
        <Link className="btn-indigo" href="/404">
          404 error
        </Link>
      </div>
      <p className="leading-normal">
        👆 These links are intended to be broken to illustrate how error
        handling works.
      </p>
    </>
  )
}

Index.layout = withLayout(Layout)

export default Index

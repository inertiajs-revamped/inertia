// @ts-nocheck
import { Head, withLayout } from '@inertiajs-revamped/react'

import Counter from '@/components/counter'
import Layout from '@/layouts/default'

const Example = () => {
  return (
    <>
      <Head title="Example" />
      <h1>Counter</h1>
      <p>
        This is a simple, hydrated <code>Counter</code> component.
      </p>
      <Counter />
    </>
  )
}

Example.layout = withLayout(Layout)

export default Example

// @ts-nocheck
import type { PropsWithChildren } from 'react'

import Footer from '@/views/components/footer'
import Header from '@/views/components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  )
}

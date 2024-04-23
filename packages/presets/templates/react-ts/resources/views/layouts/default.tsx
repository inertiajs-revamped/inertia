// @ts-nocheck
import type { LayoutProps } from '@inertiajs-revamped/react'

import Footer from '@/views/components/footer'
import Header from '@/views/components/header'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  )
}

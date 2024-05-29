// @ts-nocheck
import type { LayoutProps } from '@inertiajs-revamped/preact'

import Footer from '@/components/footer'
import Header from '@/components/header'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  )
}

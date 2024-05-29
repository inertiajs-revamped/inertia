// @ts-nocheck
/**
 * Define shared interface with module augmentation
 *
 * @see {@link LayoutProps}
 */
import type { LayoutProps } from '@inertiajs-revamped/react'

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

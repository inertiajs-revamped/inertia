import Footer from '@/components/footer'
import Header from '@/components/header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  )
}

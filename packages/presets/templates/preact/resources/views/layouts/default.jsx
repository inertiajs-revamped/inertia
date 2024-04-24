import Footer from '@/views/components/footer'
import Header from '@/views/components/header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  )
}

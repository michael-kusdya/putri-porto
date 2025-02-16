import Hero from "./components/hero"
import About from "./components/about"
import Gallery from "./components/gallery"
import Portfolio from "./components/portfolio"
import Testimonials from "./components/testimonials"
import Footer from "./components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Gallery />
      <Portfolio />
      <Testimonials />
      <Footer />
    </main>
  )
}
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Servicios from './pages/Servicios'
import Portfolio from './pages/Portfolio'
import Clientes from './pages/Clientes'
import Contacto from './pages/Contacto'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      {/* Textura cinematográfica: grano de película + viñeteado */}
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}

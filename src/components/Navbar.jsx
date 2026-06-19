import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Clientes', to: '/clientes' },
  { label: 'Contacto', to: '/contacto' },
]

const LOGO = '/uploads/Horizontal sin fondo 4000x338.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll while the fullscreen menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-4 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300"
        style={{
          padding: '0 2rem',
          borderRadius: scrolled ? '9999px' : undefined,
          margin: scrolled ? '0 1rem' : '0',
          maxWidth: scrolled ? 'calc(100% - 2rem)' : '100%',
          background: scrolled ? 'rgba(255,255,255,0.02)' : 'transparent',
          backdropFilter: scrolled ? 'blur(4px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(4px)' : 'none',
          boxShadow: scrolled ? 'inset 0 1px 1px rgba(255,255,255,0.08)' : 'none',
        }}
      >
        {/* Logo — left column */}
        <Link to="/" className="justify-self-start flex-shrink-0 py-3" aria-label="CONCA Films — inicio">
          <img src={LOGO} alt="CONCA Films" style={{ height: 'auto', maxHeight: '22px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Center nav — desktop, centered in the auto column */}
        <div className="hidden lg:flex justify-self-center liquid-glass rounded-full px-1.5 py-1.5 items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium font-body whitespace-nowrap transition-colors ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right — Hablemos (desktop) + hamburger (mobile) */}
        <div className="justify-self-end flex items-center flex-shrink-0">
          <Link
            to="/contacto"
            className="hidden lg:inline-flex items-center text-white rounded-full px-4 py-2 text-sm font-body font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-red)' }}
          >
            Hablemos
          </Link>

          <button
            className="lg:hidden w-12 h-12 liquid-glass rounded-full flex items-center justify-center text-white"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-4xl leading-none"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <div className="mb-10">
              <img src={LOGO} alt="CONCA Films" style={{ height: '28px', width: 'auto' }} />
            </div>
            <nav className="flex flex-col items-center gap-7">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    to={l.to}
                    className="font-heading italic text-4xl text-white leading-tight hover:text-white/70 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + LINKS.length * 0.06 }}
              >
                <Link
                  to="/contacto"
                  className="mt-4 inline-flex text-white rounded-full px-8 py-3 font-body font-medium text-base"
                  style={{ backgroundColor: 'var(--color-red)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Hablemos
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { Link } from 'react-router-dom'
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from './icons'

const LINKS = [
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Clientes', to: '/clientes' },
  { label: 'Contacto', to: '/contacto' },
]

const SOCIALS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@ConcaFilms', icon: <YouTubeIcon /> },
  { label: 'Instagram', href: 'https://www.instagram.com/concafilms/', icon: <InstagramIcon /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/concafilms/', icon: <LinkedInIcon /> },
]

const LOGO = '/uploads/Horizontal sin fondo 4000x338.png'

export default function Footer() {
  return (
    <footer
      className="border-t border-white/[0.06] px-8 md:px-16 lg:px-20 py-12"
      style={{ background: '#000', position: 'relative', zIndex: 2 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" aria-label="CONCA Films — inicio">
            <img src={LOGO} alt="CONCA Films" style={{ height: '22px', width: 'auto' }} />
          </Link>
          <div className="flex gap-6 flex-wrap justify-center">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-white/30 font-body hover:text-white/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href="mailto:concafilms@gmail.com"
            className="text-sm text-white/50 font-body hover:text-white transition-colors"
          >
            concafilms@gmail.com
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/20 font-body">CONCA Films © 2026</p>
        </div>
      </div>
    </footer>
  )
}

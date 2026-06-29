import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import ThreeBackground from '../components/LazyThree'
import { YouTubeIcon, InstagramIcon, LinkedInIcon } from '../components/icons'
import useSeo from '../hooks/useSeo'

const SOCIALS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@ConcaFilms', icon: <YouTubeIcon size={20} /> },
  { label: 'Instagram', href: 'https://www.instagram.com/concafilms/', icon: <InstagramIcon size={20} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/concafilms/', icon: <LinkedInIcon size={20} /> },
]

export default function Contacto() {
  useSeo({
    title: 'Contacto — Productora audiovisual en Cuenca | CONCA Films',
    description:
      'Cuéntanos tu proyecto de vídeo o fotografía. Productora audiovisual en Cuenca disponible para spots, eventos y festivales en toda España. Escríbenos a concafilms@gmail.com.',
    path: '/contacto',
  })
  return (
    <Page>
      <section className="relative min-h-screen flex items-center justify-center px-8 py-32 overflow-hidden bg-black">
        <ThreeBackground className="opacity-90" count={900} />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionReveal>
            <span
              style={{ display: 'block', width: '3rem', height: '1px', background: 'var(--color-red)', margin: '0 auto 2.5rem' }}
            />
          </SectionReveal>

          <BlurText
            text="Tu próxima pieza empieza aquí."
            className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl tracking-[-2px]"
            justify="center"
          />

          <SectionReveal delay={0.4}>
            <p className="mt-6 text-base md:text-lg text-white/50 font-body font-light">
              Cuéntanos tu proyecto. Sin compromiso.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <a
              href="mailto:concafilms@gmail.com"
              className="mt-12 inline-block font-heading italic text-white text-3xl md:text-5xl lg:text-6xl tracking-[-2px] hover:text-white/60 transition-colors break-words"
            >
              concafilms@gmail.com
            </a>
          </SectionReveal>

          <SectionReveal delay={0.8}>
            <div className="mt-14 flex items-center justify-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </Page>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import ThreeBackground from '../components/LazyThree'
import ClientLogo from '../components/ClientLogo'
import { CLIENTS } from '../data/clients'
import { ArrowUpRight, ArrowRight, VideoIcon, CameraIcon } from '../components/icons'

const HERO_IMG_1 = '/uploads/Image 1.png'
const HERO_IMG_2 = '/uploads/Image 2.png'

const SERVICIOS = [
  {
    icon: <VideoIcon />,
    title: 'Producción de vídeo',
    body: 'Spots, vídeos de evento, cobertura audiovisual y contenido para redes. Rodaje y postproducción propios, sin subcontratar.',
    tags: ['Spots', 'Eventos', 'Edición'],
  },
  {
    icon: <CameraIcon />,
    title: 'Reportaje fotográfico',
    body: 'Cobertura fotográfica profesional para eventos, fiestas y conciertos.',
    tags: ['Eventos', 'Festividades', 'Conciertos'],
  },
]

function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 150])
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setShowFirst((s) => !s), 6000)
    return () => clearInterval(id)
  }, [])

  const imgStyle = {
    position: 'absolute',
    inset: 0,
    width: '120%',
    height: '120%',
    objectFit: 'cover',
    objectPosition: 'center top',
    left: '50%',
    top: 0,
    transform: 'translateX(-50%)',
    transition: 'opacity 2.5s ease-in-out',
  }

  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden bg-black">
      {/* Parallax crossfade background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img src={HERO_IMG_1} alt="" style={{ ...imgStyle, opacity: showFirst ? 1 : 0 }} />
        <img src={HERO_IMG_2} alt="" style={{ ...imgStyle, opacity: showFirst ? 0 : 1 }} />
      </motion.div>

      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Decorative 3D particle field */}
      <ThreeBackground className="z-[2]" count={1100} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <SectionReveal delay={0.1}>
          <img
            src="/uploads/Logo principal sin fondo.png"
            alt="CONCA Films"
            className="mx-auto mb-6 md:mb-8 h-24 md:h-32 lg:h-36 w-auto object-contain"
            style={{ maxWidth: '90vw' }}
          />
        </SectionReveal>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-2rem -2.5rem',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 78%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <BlurText
              text="Vídeos que hacen que tu marca se vea profesional"
              className="text-4xl md:text-5xl lg:text-[4.5rem] font-heading italic text-white leading-[0.9] max-w-4xl mx-auto tracking-[-3px]"
              justify="center"
            />
          </div>
        </div>

        <SectionReveal delay={0.9}>
          <p
            className="mt-6 text-sm md:text-base text-white/90 max-w-xl mx-auto font-body font-light leading-snug"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          >
            Producción audiovisual profesional para marcas, artistas, eventos y fiestas culturales.
            Equipo propio. Entrega a tiempo. En cualquier parte de España.
          </p>
        </SectionReveal>

        <SectionReveal delay={1.15}>
          <div className="flex items-center gap-5 mt-9 justify-center flex-wrap">
            <Link
              to="/portfolio"
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Ver portfolio <ArrowUpRight />
            </Link>
            <Link
              to="/contacto"
              className="text-white rounded-full px-6 py-3 text-sm font-medium font-body inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--color-red)' }}
            >
              Hablemos <ArrowUpRight />
            </Link>
          </div>
        </SectionReveal>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1"
        >
          <span className="w-1 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </div>
    </section>
  )
}

function NosotrosResumen() {
  return (
    <section className="bg-black relative z-[2] px-8 md:px-16 lg:px-20 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="red-line" />
            <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase">Quiénes somos</p>
          </div>
          <BlurText
            text="No hacemos trabajo mediocre."
            className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-2px]"
            justify="left"
          />
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="mt-5 font-heading italic text-white/60 text-2xl md:text-3xl tracking-[-1px]">
            Cada proyecto es diferente. Lo tratamos como tal.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.35}>
          <p className="mt-8 text-base md:text-lg text-white/60 font-body font-light leading-relaxed max-w-2xl">
            Somos Pedro, Pablo y Juan. Un equipo de tres con equipo propio, criterio claro y las cosas
            a tiempo. Trabajamos con marcas, artistas, eventos y fiestas culturales en toda España, sin
            intermediarios ni sorpresas.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.5}>
          <Link
            to="/nosotros"
            className="mt-8 inline-flex items-center gap-2 text-sm font-body text-white/80 hover:text-white transition-colors group"
          >
            Conoce al equipo
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}

function ServiciosResumen() {
  return (
    <section className="bg-black relative z-[2] px-8 md:px-16 lg:px-20 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="red-line" />
            <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase">Qué hacemos</p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICIOS.map((card, i) => (
            <SectionReveal key={card.title} delay={i * 0.12}>
              <div className="liquid-glass-card rounded-[1.25rem] p-6 flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                </div>
                <h3 className="mt-5 font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] leading-none">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-white/70 font-body font-light leading-snug">{card.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/80 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal delay={0.3}>
          <Link
            to="/servicios"
            className="mt-10 inline-flex items-center gap-2 text-sm font-body text-white/80 hover:text-white transition-colors group"
          >
            Ver todos los servicios
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}

function Clientes() {
  // Build a "half" wide enough to exceed any viewport by repeating the list,
  // then render it twice. The track scrolls -50% (one half), so the loop is
  // seamless and never runs out of logos on wide screens.
  const half = Array.from({ length: 4 }, () => CLIENTS).flat()
  const loop = [...half, ...half]
  return (
    <section className="bg-[#0A0A0A] border-y border-white/[0.06] py-16 relative z-[2] overflow-hidden">
      <div className="px-8 md:px-16 lg:px-20 mb-10">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <span className="red-line" />
          <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase">
            Ya han confiado en nosotros
          </p>
        </div>
      </div>
      <div className="marquee-mask relative">
        {/* edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }}
        />
        <div className="marquee-track items-center gap-16">
          {loop.map((client, i) => (
            <div key={i} className="flex items-center justify-center flex-shrink-0">
              <ClientLogo
                client={client}
                imgClassName="h-12 md:h-14 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                fallbackClassName="liquid-glass rounded-full px-6 py-3 font-heading italic text-xl text-white/50 whitespace-nowrap transition-colors duration-300 hover:text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAFinal() {
  return (
    <section className="bg-black relative z-[2] min-h-[55vh] flex items-center justify-center px-8 py-24">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <SectionReveal>
          <span style={{ display: 'block', width: '3rem', height: '1px', background: 'var(--color-red)', margin: '0 auto 2.5rem' }} />
        </SectionReveal>
        <BlurText
          text="Tu próxima pieza empieza aquí."
          className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl tracking-[-2px]"
          justify="center"
        />
        <SectionReveal delay={0.4}>
          <p className="mt-6 text-base text-white/40 font-body font-light">
            Cuéntanos tu proyecto. Sin compromiso.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.6}>
          <Link
            to="/contacto"
            className="mt-8 text-white rounded-full px-8 py-3.5 text-sm font-body font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-red)' }}
          >
            Hablemos <ArrowUpRight />
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <NosotrosResumen />
      <ServiciosResumen />
      <Clientes />
      <CTAFinal />
    </Page>
  )
}

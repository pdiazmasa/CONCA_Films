import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

// Preguntas frecuentes. El texto debe coincidir EXACTAMENTE con el
// FAQPage (JSON-LD) que genera scripts/prerender-seo.mjs para /contacto —
// si cambias una pregunta o respuesta aquí, cámbiala también allí.
export const FAQS = [
  {
    q: '¿En qué zonas trabajáis?',
    a: 'Tenemos sede en Cuenca y cubrimos eventos en toda España, desplazándonos allí donde nos necesitéis.',
  },
  {
    q: '¿Qué tipo de eventos cubrís?',
    a: 'Bodas, eventos corporativos, festivales, conciertos, graduaciones, inauguraciones y presentaciones, entre otros — cualquier evento que quieras que quede bien documentado.',
  },
  {
    q: '¿Qué servicios ofrecéis?',
    a: 'Cobertura de eventos, producción de vídeo, fotografía profesional y spots publicitarios, con edición propia incluida en todos los casos.',
  },
  {
    q: '¿Trabajáis con equipo propio?',
    a: 'Sí, siempre con equipo propio (cámaras Canon, Lumix y Sony, dron y estabilizadores) y sin intermediarios, de principio a fin.',
  },
  {
    q: '¿Cómo pido presupuesto?',
    a: 'Escríbenos a concafilms@gmail.com o por WhatsApp contándonos el evento (fecha, lugar y qué necesitas cubrir) y te respondemos con un presupuesto ajustado.',
  },
  {
    q: '¿Cuándo recibo el material?',
    a: 'Trabajamos con plazos de entrega marcados, que acordamos con cada cliente según el volumen del proyecto.',
  },
  {
    q: '¿Puedo ver trabajos anteriores?',
    a: 'Sí, en nuestro portfolio tenéis vídeos y fotografías de eventos, deportes, tradición y clubes que hemos cubierto.',
  },
  {
    q: '¿Quién forma el equipo de CONCA Films?',
    a: 'Pedro, Pablo y Juan. Un equipo de tres, con equipo propio (cámaras Canon, Lumix y Sony, dron y estabilizadores) y sin intermediarios.',
  },
  {
    q: '¿Podéis cubrir vídeo y fotografía a la vez en el mismo evento?',
    a: 'Sí, podemos combinar ambos servicios en la misma cobertura si el evento lo necesita.',
  },
  {
    q: '¿Tenéis experiencia con discotecas, clubes y sesiones de DJ?',
    a: 'Sí, cubrimos sesiones de DJ y vida nocturna, además de bodas, festivales, eventos corporativos y deportivos.',
  },
  {
    q: '¿Hacéis fotografía o vídeo deportivo?',
    a: 'Sí, cubrimos eventos deportivos como motociclismo, hípica y competiciones locales, entre otros.',
  },
  {
    q: '¿Grabáis spots publicitarios para marcas?',
    a: 'Sí, producimos spots publicitarios y contenido de marca, con rodaje y edición propios de principio a fin.',
  },
  {
    q: '¿Cómo es el proceso, desde que contacto hasta que recibo el material?',
    a: 'Nos escribes contándonos el evento (fecha, lugar y qué necesitas), te enviamos un presupuesto ajustado, cubrimos el evento con equipo propio y entregamos el material editado en el plazo acordado.',
  },
  {
    q: '¿Con cuánta antelación debo reservar la cobertura de mi evento?',
    a: 'Cuanto antes mejor, sobre todo en fechas de alta demanda (bodas, festivales, fin de curso). Escríbenos con tu fecha y te confirmamos disponibilidad.',
  },
  {
    q: '¿En qué formato entregáis el material?',
    a: 'Vídeo en alta calidad, listo para redes o proyección, y fotografías en alta resolución, ya editadas y seleccionadas.',
  },
  {
    q: '¿Usáis dron en las coberturas?',
    a: 'Sí, contamos con dron propio y lo incorporamos cuando el evento y la normativa del espacio lo permiten.',
  },
  {
    q: '¿Puedo pedir cambios en el montaje o en la selección final?',
    a: 'Sí, revisamos el resultado contigo y ajustamos lo necesario antes de la entrega final.',
  },
  {
    q: '¿Qué pasa si el evento se aplaza o se cancela?',
    a: 'Lo hablamos contigo caso por caso para reprogramar la cobertura sin problema.',
  },
]

export default function Contacto() {
  const [faqOpen, setFaqOpen] = useState(false)
  useSeo({
    title: 'Contacto — Productora audiovisual en Cuenca | CONCA Films',
    description:
      'Cuéntanos tu proyecto de eventos, vídeo o fotografía. Productora audiovisual en Cuenca disponible para eventos, spots y festivales en toda España. Escríbenos a concafilms@gmail.com.',
    path: '/contacto',
  })
  return (
    <Page>
      <section className="relative min-h-screen flex items-center justify-center px-8 py-32 overflow-hidden bg-black">
        <ThreeBackground className="opacity-90" count={900} />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <BlurText
            text="Hablemos de tu evento."
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
              href="tel:+34608407913"
              className="mt-12 inline-block font-heading italic text-white text-3xl md:text-5xl lg:text-6xl tracking-[-2px] hover:text-white/60 transition-colors break-words"
            >
              +34 608 40 79 13
            </a>
          </SectionReveal>

          <SectionReveal delay={0.7}>
            <a
              href="mailto:concafilms@gmail.com"
              className="mt-5 inline-block font-body text-white/60 text-lg md:text-xl hover:text-white transition-colors"
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

      {/* Preguntas frecuentes — ver nota junto a FAQS más arriba */}
      <section className="px-8 md:px-16 lg:px-20 py-16 lg:py-24 max-w-3xl mx-auto">
        <SectionReveal>
          <div className="mb-10">
            <p className="text-[11px] font-body font-semibold text-white/50 tracking-[0.35em] uppercase">
              Preguntas frecuentes
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="liquid-glass rounded-[1.25rem] overflow-hidden">
            <button
              type="button"
              onClick={() => setFaqOpen((v) => !v)}
              aria-expanded={faqOpen}
              className="w-full flex items-center justify-between gap-4 p-6 text-left"
            >
              <h3 className="font-heading italic text-white text-lg md:text-xl tracking-[-0.5px]">
                Todo lo que necesitas saber
              </h3>
              <motion.span
                animate={{ rotate: faqOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/70 text-xl leading-none"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {faqOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col divide-y divide-white/[0.06]">
                    {FAQS.map((item) => (
                      <div key={item.q} className="px-6 pb-6 pt-4 first:pt-0">
                        <h4 className="font-heading italic text-white text-base md:text-lg tracking-[-0.3px]">
                          {item.q}
                        </h4>
                        <p className="mt-2 text-sm md:text-base text-white/50 font-body font-light leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </section>
    </Page>
  )
}

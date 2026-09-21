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
]

export default function Contacto() {
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
        <div className="flex flex-col gap-4">
          {FAQS.map((item, i) => (
            <SectionReveal key={item.q} delay={i * 0.05}>
              <div className="liquid-glass rounded-[1.25rem] p-6">
                <h3 className="font-heading italic text-white text-lg md:text-xl tracking-[-0.5px]">{item.q}</h3>
                <p className="mt-2 text-sm md:text-base text-white/50 font-body font-light leading-relaxed">
                  {item.a}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </Page>
  )
}

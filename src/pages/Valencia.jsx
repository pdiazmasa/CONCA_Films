import { Link } from 'react-router-dom'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import { ArrowRight } from '../components/icons'
import useJson from '../hooks/useJson'
import useSeo from '../hooks/useSeo'
import { projectAlt } from '../utils/seoAlt'

// A quién ayudamos en Valencia — mismos segmentos del giro estratégico a
// eventos (ver notas internas), en el mismo orden.
const SEGMENTOS = [
  {
    titulo: 'Galerías de arte',
    detalle: 'Cobertura de inauguraciones, exposiciones y eventos culturales.',
  },
  {
    titulo: 'Agencias de artistas',
    detalle: 'Contenido para giras, showcases y presentaciones.',
  },
  {
    titulo: 'Agencias de eventos',
    detalle: 'Vídeo y foto para cualquier evento que organicéis, de principio a fin.',
  },
  {
    titulo: 'Espacios para bodas y eventos',
    detalle: 'Material audiovisual para vuestros clientes, listo para su promoción.',
  },
  {
    titulo: 'Centros académicos privados',
    detalle: 'Graduaciones, actos y celebraciones del curso.',
  },
  {
    titulo: 'Agencias de fiestas y viajes',
    detalle: 'Cobertura de fiestas, viajes de fin de curso y eventos para jóvenes.',
  },
]

export default function Valencia() {
  // public/uploads/valencia/valencia.json — vacío hasta que haya trabajos
  // reales hechos en Valencia; en cuanto lleguen, se añaden ahí (mismo
  // formato que public/uploads/fotos o /videos) y esta sección los muestra
  // sola, sin tocar el código.
  const { data: trabajos } = useJson('uploads/valencia/valencia.json', [])

  useSeo({
    title: 'Producción audiovisual de eventos en Valencia | CONCA Films',
    description:
      'Cobertura de eventos en Valencia: bodas, eventos corporativos, galerías, agencias y centros académicos. Vídeo y fotografía profesional, equipo propio.',
    path: '/valencia',
  })

  return (
    <Page>
      {/* Intro */}
      <section className="px-8 md:px-16 lg:px-20 pt-36 lg:pt-44 pb-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-[11px] font-body font-semibold text-white/50 tracking-[0.35em] uppercase">Valencia</p>
        </div>
        <BlurText
          text="Producción audiovisual de eventos en Valencia."
          className="font-heading italic text-white text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[-3px] max-w-4xl"
          justify="left"
        />
        <SectionReveal delay={0.25}>
          <p className="mt-8 text-base md:text-lg text-white/60 font-body font-light leading-relaxed max-w-2xl">
            Ampliamos cobertura a Valencia y alrededores: bodas, eventos corporativos, galerías de
            arte, fiestas y celebraciones. Mismo equipo, mismo cuidado, en cualquier parte de la
            ciudad.
          </p>
        </SectionReveal>
      </section>

      {/* A quién ayudamos */}
      <section className="px-8 md:px-16 lg:px-20 py-16 lg:py-20 max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10">
            <p className="text-[11px] font-body font-semibold text-white/50 tracking-[0.35em] uppercase">
              A quién ayudamos en Valencia
            </p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEGMENTOS.map((s, i) => (
            <SectionReveal key={s.titulo} delay={i * 0.08}>
              <div className="liquid-glass rounded-[1.25rem] p-6 h-full transition-transform duration-300 hover:scale-[1.02]">
                <h3 className="font-heading italic text-white text-xl tracking-[-0.5px]">{s.titulo}</h3>
                <p className="mt-2 text-sm text-white/50 font-body font-light leading-relaxed">{s.detalle}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Trabajos en Valencia — se rellena sola en cuanto haya contenido real */}
      <section className="px-8 md:px-16 lg:px-20 py-16 lg:py-20 max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-8">
            <p className="text-[11px] font-body font-semibold text-white/50 tracking-[0.35em] uppercase">
              Trabajos en Valencia
            </p>
          </div>
        </SectionReveal>
        {trabajos.length === 0 ? (
          <SectionReveal delay={0.1}>
            <div className="liquid-glass rounded-[1.25rem] flex items-center justify-center py-20 text-center">
              <div>
                <p className="font-heading italic text-white/30 text-2xl">Próximamente</p>
                <p className="text-sm text-white/20 font-body mt-2 max-w-sm mx-auto">
                  Estamos empezando a trabajar en Valencia — muy pronto verás aquí nuestros primeros
                  proyectos.
                </p>
              </div>
            </div>
          </SectionReveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trabajos.map((t) => (
              <div key={t.id ?? t.titulo} className="aspect-video rounded-[1.25rem] overflow-hidden liquid-glass">
                {t.imagen ? (
                  <img
                    src={t.imagen}
                    alt={projectAlt({ ciudad: 'Valencia', ...t })}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 lg:px-20 py-24 max-w-7xl mx-auto">
        <div className="liquid-glass-card rounded-[1.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px]">
              ¿Tienes un evento en Valencia?
            </h3>
            <p className="mt-2 text-white/50 font-body font-light">Cuéntanoslo. Sin compromiso.</p>
          </div>
          <Link
            to="/contacto"
            className="text-white rounded-full px-8 py-3.5 text-sm font-body font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: 'var(--color-red)' }}
          >
            Hablemos <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Page>
  )
}

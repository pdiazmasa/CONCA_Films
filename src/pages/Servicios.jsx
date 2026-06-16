import { useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import { ArrowRight } from '../components/icons'

const SERVICES = [
  {
    n: '01',
    kicker: 'Producción de vídeo',
    title: 'Lo que grabamos, se queda.',
    body: 'Spots, vídeos de evento, cobertura audiovisual y contenido para redes. Nos encargamos del concepto, el rodaje y la postproducción con equipo propio, sin subcontratar ni una sola fase. El resultado: piezas que representan tu marca como merece y que funcionan donde tienen que funcionar.',
    tags: ['Spots', 'Eventos', 'Edición'],
    image: '/uploads/Semana Santa portada.PNG',
    cat: 'video',
    linkLabel: 'Ver proyectos de vídeo',
  },
  {
    n: '02',
    kicker: 'Reportaje fotográfico',
    title: 'Cada imagen tiene un porqué.',
    body: 'Cobertura fotográfica profesional de eventos, fiestas culturales y conciertos. Buscamos la luz, el momento y el encuadre que cuentan algo — no disparamos por disparar. Te entregamos una selección cuidada, editada y lista para publicar.',
    tags: ['Eventos', 'Festividades', 'Conciertos'],
    image: '/uploads/torres.PNG',
    cat: 'foto',
    linkLabel: 'Ver proyectos de foto',
  },
]

function ServiceImage({ service }) {
  const [error, setError] = useState(false)
  return (
    <div className="liquid-glass rounded-[1.5rem] overflow-hidden aspect-[4/3] relative">
      {service.image && !error ? (
        <img
          src={service.image}
          alt={service.kicker}
          onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
          <span className="font-heading italic text-3xl text-white/20">{service.kicker}</span>
        </div>
      )}
      <span className="absolute top-5 left-5 font-heading italic text-white/80 text-4xl">{service.n}</span>
    </div>
  )
}

export default function Servicios() {
  return (
    <Page>
      {/* Intro */}
      <section className="px-8 md:px-16 lg:px-20 pt-36 lg:pt-44 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="red-line" />
          <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase">Qué ofrecemos</p>
        </div>
        <BlurText
          text="Lo que hacemos, lo hacemos bien."
          className="font-heading italic text-white text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[-3px] max-w-4xl"
          justify="left"
        />
      </section>

      {/* Service blocks — alternating layout */}
      <div className="flex flex-col gap-20 lg:gap-28 px-8 md:px-16 lg:px-20 py-12 max-w-7xl mx-auto">
        {SERVICES.map((service, i) => {
          const reverse = i % 2 === 1
          return (
            <SectionReveal key={service.n} amount={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={reverse ? 'lg:order-2' : ''}>
                  <ServiceImage service={service} />
                </div>
                <div className={reverse ? 'lg:order-1' : ''}>
                  <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase mb-4">
                    {service.kicker}
                  </p>
                  <h2 className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-2px]">
                    {service.title}
                  </h2>
                  <p className="mt-6 text-base md:text-lg text-white/60 font-body font-light leading-relaxed max-w-xl">
                    {service.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/80 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/portfolio?cat=${service.cat}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-body text-white/80 hover:text-white transition-colors group"
                  >
                    {service.linkLabel}
                    <span className="transition-transform group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>
            </SectionReveal>
          )
        })}
      </div>

      {/* CTA strip */}
      <section className="px-8 md:px-16 lg:px-20 py-24 max-w-7xl mx-auto">
        <div className="liquid-glass-card rounded-[1.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px]">
              ¿Tienes un proyecto en mente?
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

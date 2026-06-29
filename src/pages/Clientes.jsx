import { Link } from 'react-router-dom'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import ClientLogo from '../components/ClientLogo'
import { ArrowUpRight } from '../components/icons'
import { CLIENTS } from '../data/clients'
import useSeo from '../hooks/useSeo'

export default function Clientes() {
  useSeo({
    title: 'Clientes — Marcas, eventos y festivales | CONCA Films Cuenca',
    description:
      'Marcas, artistas, eventos y fiestas culturales que han confiado en CONCA Films para su producción audiovisual y fotografía en Cuenca y toda España.',
    path: '/clientes',
  })
  return (
    <Page>
      {/* Intro */}
      <section className="px-8 md:px-16 lg:px-20 pt-36 lg:pt-44 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="red-line" />
          <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase">Confían en nosotros</p>
        </div>
        <BlurText
          text="Ya han confiado en nosotros."
          className="font-heading italic text-white text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[-3px] max-w-4xl"
          justify="left"
        />
        <SectionReveal delay={0.25}>
          <p className="mt-8 text-base md:text-lg text-white/60 font-body font-light leading-relaxed max-w-2xl">
            Marcas, artistas, eventos y fiestas culturales que han puesto su imagen en nuestras manos.
            Trabajo directo, sin intermediarios, en cualquier parte de España.
          </p>
        </SectionReveal>
      </section>

      {/* Logos grid */}
      <section className="px-8 md:px-16 lg:px-20 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLIENTS.map((client, i) => (
            <SectionReveal key={client.name} delay={i * 0.08}>
              <div className="liquid-glass-card rounded-[1.25rem] h-36 flex items-center justify-center p-4 transition-transform duration-300 hover:scale-[1.02]">
                <ClientLogo
                  client={client}
                  imgClassName="max-h-full max-w-[90%] object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  fallbackClassName="font-heading italic text-2xl text-white/40 text-center leading-tight"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 lg:px-20 pb-28 max-w-7xl mx-auto">
        <div className="liquid-glass-card rounded-[1.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px]">
              ¿Quieres ser el próximo?
            </h3>
            <p className="mt-2 text-white/50 font-body font-light">Cuéntanos tu proyecto. Sin compromiso.</p>
          </div>
          <Link
            to="/contacto"
            className="text-white rounded-full px-8 py-3.5 text-sm font-body font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: 'var(--color-red)' }}
          >
            Hablemos <ArrowUpRight />
          </Link>
        </div>
      </section>
    </Page>
  )
}

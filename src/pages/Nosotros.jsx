import { useState } from 'react'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import { InstagramIcon, LinkedInIcon } from '../components/icons'
import useJson from '../hooks/useJson'
import useSeo from '../hooks/useSeo'

// Los datos de personas y material viven en JSON dentro de sus propias
// carpetas de fotos (public/uploads/equipo/equipo.json y
// public/uploads/material/material.json), junto a las imágenes que usan.
// Aquí solo se les añade la ruta de la carpeta a cada nombre de archivo.
function useTeam() {
  const { data } = useJson('uploads/equipo/equipo.json', [])
  return data.map((m) => ({ ...m, photo: m.foto ? `/uploads/equipo/${m.foto}` : null }))
}

function useEquipo() {
  const { data } = useJson('uploads/material/material.json', [])
  return data.map((m) => ({ ...m, photo: m.foto ? `/uploads/material/${m.foto}` : null }))
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function TeamPhoto({ member }) {
  const [error, setError] = useState(false)
  if (member.photo && !error) {
    return (
      <img
        src={member.photo}
        alt={member.nombre}
        onError={() => setError(true)}
        className="w-full h-full object-cover object-top"
      />
    )
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
      <span className="font-heading italic text-5xl text-white/25">{initials(member.nombre)}</span>
    </div>
  )
}

function EquipPhoto({ item }) {
  const [error, setError] = useState(false)
  if (item.photo && !error) {
    return (
      <img
        src={item.photo}
        alt={item.titulo}
        onError={() => setError(true)}
        style={{ width: '100%', height: '160px', objectFit: 'contain', objectPosition: 'center', padding: '16px' }}
      />
    )
  }
  return (
    <div style={{ height: '160px' }} className="w-full flex items-center justify-center">
      <span className="font-heading italic text-2xl text-white/20">{item.titulo}</span>
    </div>
  )
}

export default function Nosotros() {
  const team = useTeam()
  const equipo = useEquipo()
  useSeo({
    title: 'Nosotros — Equipo de producción audiovisual en Cuenca | CONCA Films',
    description:
      'Somos Pedro, Pablo y Juan: equipo de producción audiovisual y fotografía en Cuenca con equipo propio. Cámaras Canon, Lumix y Sony, dron y estabilizadores para vídeo y eventos.',
    path: '/nosotros',
  })
  return (
    <Page>
      {/* Intro + team */}
      <section className="px-8 md:px-16 lg:px-20 pt-36 lg:pt-44 pb-20 max-w-7xl mx-auto">
        <BlurText
          text="Tres personas. Un equipo."
          className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[-3px]"
          justify="left"
        />
        <SectionReveal delay={0.25}>
          <p className="mt-8 text-base md:text-lg text-white/60 font-body font-light leading-relaxed max-w-3xl">
            CONCA Films nació con el objetivo de hacer producción audiovisual profesional sin los
            problemas de una gran productora. Trato cercano y trabajo personalizado. Operamos en toda
            España para eventos, artistas y marcas.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
          {team.map((member, i) => (
            <SectionReveal key={member.nombre} delay={i * 0.12}>
              <div className="liquid-glass-card rounded-[1.5rem] overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]">
                <div className="w-full" style={{ height: '320px' }}>
                  <TeamPhoto member={member} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-heading italic text-white text-2xl tracking-[-0.5px] leading-tight">
                    {member.nombre}
                  </p>
                  <p className="text-sm text-white/50 font-body mt-1">{member.rol}</p>
                  <p className="text-sm text-white/60 font-body font-light leading-relaxed mt-3">{member.bio}</p>
                  {(member.linkedin || member.instagram) && (
                    <div className="mt-4 flex flex-col gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-white/40 font-body hover:text-white/80 transition-colors w-fit"
                        >
                          <LinkedInIcon size={14} />
                          LinkedIn
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-white/40 font-body hover:text-white/80 transition-colors w-fit"
                        >
                          <InstagramIcon size={14} />
                          {member.instagramHandle}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* En acción */}
      <section className="px-8 md:px-16 lg:px-20 py-24 lg:py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <SectionReveal>
            <div className="mb-6">
              <p className="text-[11px] font-body font-semibold text-white/50 tracking-[0.35em] uppercase">
                En acción
              </p>
            </div>
            <h2 className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-2px] max-w-xl">
              Donde está el evento, estamos nosotros.
            </h2>
            <p className="mt-6 text-base text-white/50 font-body font-light leading-relaxed max-w-[48ch]">
              Cobertura en directo, sin perder ni un momento.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="liquid-glass rounded-[1.5rem] overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <img
                src="/uploads/marca/imagen_pedro.jpeg"
                alt="Equipo de CONCA Films cubriendo un evento en directo"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Equipo técnico */}
      <section className="px-8 md:px-16 lg:px-20 py-24 lg:py-28 max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-6">
            <p className="text-[11px] font-body font-semibold text-white/50 tracking-[0.35em] uppercase">Equipo técnico propio</p>
          </div>
          <h2 className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-2px] max-w-2xl">
            Equipo propio. Sin depender de nadie.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="mt-6 text-base text-white/50 font-body font-light leading-relaxed max-w-[48ch]">
            Con nuestro equipo nos adaptamos a cada caso.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {equipo.map((item, i) => (
            <SectionReveal key={item.titulo} delay={i * 0.1}>
              <div className="liquid-glass rounded-[1.25rem] overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]">
                <div className="w-full bg-[#0A0A0A] flex items-center justify-center">
                  <EquipPhoto item={item} />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="font-heading italic text-white text-lg tracking-[-0.5px]">{item.titulo}</h3>
                  <p className="text-sm text-white/50 font-body font-light leading-snug flex-1">{item.detalle}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </Page>
  )
}

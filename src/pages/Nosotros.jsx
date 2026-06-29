import { useState } from 'react'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import { InstagramIcon, LinkedInIcon } from '../components/icons'
import useSeo from '../hooks/useSeo'

const TEAM = [
  {
    name: 'Pedro Díaz Masa Valencia',
    role: 'Guionista y editor profesional',
    bio: 'Especialista en rodaje y postproducción.',
    photo: '/uploads/equipo/pedro.jpg',
    linkedin: 'https://www.linkedin.com/in/pedrodiazmasa/',
  },
  {
    name: 'Pablo Serrano Morcillo',
    role: 'Videógrafo y piloto de dron',
    bio: 'Responsable de vídeo y tomas aéreas.',
    photo: '/uploads/equipo/pablo.jpg',
    instagram: 'https://www.instagram.com/serrano.photo_/',
    instagramHandle: '@serrano.photo_',
  },
  {
    name: 'Juan Chacón de la Fuente',
    role: 'Fotógrafo y videógrafo',
    bio: 'Responsable de fotografía.',
    photo: '/uploads/equipo/juan.jpg',
    instagram: 'https://www.instagram.com/chshots_/',
    instagramHandle: '@chshots_',
  },
]

const EQUIPO = [
  {
    title: 'Canon EOS R6 Mark II',
    detail: 'Objetivos RF 50 mm f1.8 · RF 16 mm f2.8',
    photo: '/uploads/material/canon_eos_r6.png',
  },
  {
    title: 'Lumix DC-GH5',
    detail: 'Objetivos 12-35 mm f2.8 II · 35-100 mm f2.8 II · 20 mm f1.7 II',
    photo: '/uploads/material/Lumix.png',
  },
  {
    title: 'Sony a7 IV',
    detail: 'Sigma 28-70 f2.8 · Sony 70-200 GM',
    photo: '/uploads/material/sony.png',
  },
  {
    title: 'DJI Mini 5 Pro',
    detail: 'Dron cinematográfico con filtros ND',
    photo: '/uploads/material/dron.png',
  },
  {
    title: 'Removu K1',
    detail: 'Cámara estabilizadora 4K de mano',
    photo: '/uploads/material/removu.png',
  },
]

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
        alt={member.name}
        onError={() => setError(true)}
        className="w-full h-full object-cover object-top"
      />
    )
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
      <span className="font-heading italic text-5xl text-white/25">{initials(member.name)}</span>
    </div>
  )
}

function EquipPhoto({ item }) {
  const [error, setError] = useState(false)
  if (item.photo && !error) {
    return (
      <img
        src={item.photo}
        alt={item.title}
        onError={() => setError(true)}
        style={{ width: '100%', height: '160px', objectFit: 'contain', objectPosition: 'center', padding: '16px' }}
      />
    )
  }
  return (
    <div style={{ height: '160px' }} className="w-full flex items-center justify-center">
      <span className="font-heading italic text-2xl text-white/20">{item.title}</span>
    </div>
  )
}

export default function Nosotros() {
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
            España para marcas, artistas, eventos y fiestas culturales.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
          {TEAM.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.12}>
              <div className="liquid-glass-card rounded-[1.5rem] overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]">
                <div className="w-full" style={{ height: '320px' }}>
                  <TeamPhoto member={member} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-heading italic text-white text-2xl tracking-[-0.5px] leading-tight">
                    {member.name}
                  </p>
                  <p className="text-sm text-white/50 font-body mt-1">{member.role}</p>
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

      {/* Equipo técnico */}
      <section className="px-8 md:px-16 lg:px-20 py-24 lg:py-28 max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="red-line" />
            <p className="text-xs font-body text-white/40 tracking-[0.2em] uppercase">Equipo técnico propio</p>
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
          {EQUIPO.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.1}>
              <div className="liquid-glass rounded-[1.25rem] overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-[1.02]">
                <div className="w-full bg-[#0A0A0A] flex items-center justify-center">
                  <EquipPhoto item={item} />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="font-heading italic text-white text-lg tracking-[-0.5px]">{item.title}</h3>
                  <p className="text-sm text-white/50 font-body font-light leading-snug flex-1">{item.detail}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </Page>
  )
}

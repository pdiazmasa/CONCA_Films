import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import ProjectCard from '../components/ProjectCard'
import Lightbox from '../components/Lightbox'
import useSeo from '../hooks/useSeo'

const FILTERS = [
  { key: 'video', label: 'Vídeo' },
  { key: 'foto', label: 'Fotografía' },
]
const VALID = FILTERS.map((f) => f.key)
const DEFAULT = 'video'

export default function Portfolio() {
  useSeo({
    title: 'Portfolio — Vídeo y fotografía de eventos y festivales | CONCA Films',
    description:
      'Trabajos de CONCA Films: spots, vídeos de evento, cobertura de festivales y reportaje fotográfico en Cuenca y toda España. Mira nuestro portfolio audiovisual.',
    path: '/portfolio',
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [active, setActive] = useState(VALID.includes(catParam) ? catParam : DEFAULT)
  const [projects, setProjects] = useState(null) // null = loading
  const [error, setError] = useState(false)
  const [gallery, setGallery] = useState(null) // project shown in the lightbox

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}data/portfolio.json`)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setProjects(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setProjects([])
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Sync the active filter with the URL ?cat (deep links from Servicios).
  useEffect(() => {
    setActive(VALID.includes(catParam) ? catParam : DEFAULT)
  }, [catParam])

  function selectFilter(key) {
    setActive(key)
    setSearchParams({ cat: key })
  }

  const filtered = useMemo(() => {
    if (!projects) return []
    return projects.filter((p) => p.categoria === active)
  }, [projects, active])

  return (
    <Page>
      <section className="px-8 md:px-16 lg:px-20 pt-36 lg:pt-44 pb-24 max-w-7xl mx-auto min-h-[80vh]">
        <BlurText
          text="El trabajo habla por sí solo."
          className="font-heading italic text-white text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-[-3px] max-w-4xl"
          justify="left"
        />

        {/* Filter pills */}
        <SectionReveal delay={0.2}>
          <div
            className="mt-10 liquid-glass rounded-full inline-flex items-center p-1.5 gap-1 no-scrollbar"
            style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => selectFilter(f.key)}
                className={`tab-btn rounded-full px-5 py-2 text-sm font-body font-medium ${
                  active === f.key ? 'active' : ''
                }`}
                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Grid */}
        <div className="mt-8">
          {projects === null ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="liquid-glass rounded-[1.25rem] aspect-video animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="liquid-glass rounded-[1.25rem] flex items-center justify-center py-24 text-center">
              <div>
                <p className="font-heading italic text-white/40 text-2xl">No se pudo cargar el portfolio</p>
                <p className="text-sm text-white/30 font-body mt-2">Inténtalo de nuevo en un momento.</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key={`empty-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="liquid-glass rounded-[1.25rem] flex items-center justify-center py-24 text-center"
                >
                  <div>
                    <p className="font-heading italic text-white/30 text-2xl">Próximamente</p>
                    <p className="text-sm text-white/20 font-body mt-2">Estamos preparando este contenido.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {filtered.map((p) => (
                    <ProjectCard key={p.id ?? p.titulo} project={p} onOpenGallery={setGallery} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <Lightbox project={gallery} onClose={() => setGallery(null)} />
    </Page>
  )
}

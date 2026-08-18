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

// Orden de las filas por temática, distinto según el formato (vídeo/foto).
// El valor de cada tema debe coincidir EXACTAMENTE (mismo texto) con el
// campo "tema" del JSON de ese formato (ver JSON_BY_FORMAT). Así, al editar
// el JSON, el propio texto del tema ya te dice a qué fila va a caer en la
// web. Un "tema" que no esté en esta lista cae en "Otros".
const THEMES_BY_FORMAT = {
  video: ['Spots publicitarios', 'Festivales', 'Creadores de contenido', 'Eventos', 'Deportes', 'Otros'],
  foto: ['Festivales y discotecas', 'Deportes', 'Eventos', 'Fiestas populares', 'Gastronomía', 'Otros'],
}

// Cada formato vive en su propio JSON, dentro de la misma carpeta que sus
// imágenes: los vídeos en uploads/videos/ y las fotos en uploads/fotos/.
const JSON_BY_FORMAT = {
  video: 'uploads/videos/portfolio-video.json',
  foto: 'uploads/fotos/portfolio-foto.json',
}

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
  // Los proyectos de cada formato se cachean aquí una vez cargados, para no
  // volver a pedirlos al cambiar de pestaña.
  const [dataByFormat, setDataByFormat] = useState({ video: null, foto: null })
  const [errorFormats, setErrorFormats] = useState({})
  const [gallery, setGallery] = useState(null) // project shown in the lightbox

  useEffect(() => {
    if (dataByFormat[active] !== null) return // ya cargado (o cargando)
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}${JSON_BY_FORMAT[active]}`)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setDataByFormat((prev) => ({ ...prev, [active]: Array.isArray(data) ? data : [] }))
      })
      .catch(() => {
        if (!cancelled) {
          setErrorFormats((prev) => ({ ...prev, [active]: true }))
          setDataByFormat((prev) => ({ ...prev, [active]: [] }))
        }
      })
    return () => {
      cancelled = true
    }
  }, [active, dataByFormat])

  // Sync the active filter with the URL ?cat (deep links from Servicios).
  useEffect(() => {
    setActive(VALID.includes(catParam) ? catParam : DEFAULT)
  }, [catParam])

  function selectFilter(key) {
    setActive(key)
    setSearchParams({ cat: key })
  }

  const projects = dataByFormat[active] // null = cargando
  const error = !!errorFormats[active]

  // Agrupa los proyectos del formato activo por temática, en el orden definido
  // para ese formato en THEMES_BY_FORMAT. Los proyectos sin `tema` (o con uno
  // que no esté en la lista) caen en "Otros".
  const rows = useMemo(() => {
    const themeOrder = THEMES_BY_FORMAT[active] || []
    const byTheme = new Map()
    for (const p of projects || []) {
      const key = themeOrder.includes(p.tema) ? p.tema : 'Otros'
      if (!byTheme.has(key)) byTheme.set(key, [])
      byTheme.get(key).push(p)
    }
    return themeOrder
      .map((label) => ({ key: label, label, items: byTheme.get(label) || [] }))
      .filter((r) => r.items.length > 0)
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

        {/* Thematic rows */}
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
              {rows.length === 0 ? (
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
                  className="flex flex-col gap-12 md:gap-14"
                >
                  {rows.map((row, i) => (
                    <SectionReveal key={row.key} delay={i * 0.06}>
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="red-line" />
                          <h2 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-0.5px]">
                            {row.label}
                          </h2>
                        </div>
                        <div
                          className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory"
                          style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                          {row.items.map((p) => (
                            <div
                              key={p.id ?? p.titulo}
                              className="snap-start flex-shrink-0 w-[78vw] xs:w-[320px] sm:w-[340px] md:w-[380px]"
                            >
                              <ProjectCard project={p} onOpenGallery={setGallery} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </SectionReveal>
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

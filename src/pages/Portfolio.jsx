import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page'
import BlurText from '../components/BlurText'
import SectionReveal from '../components/SectionReveal'
import ProjectCard from '../components/ProjectCard'
import Lightbox from '../components/Lightbox'
import { ChevronRight } from '../components/icons'
import useSeo from '../hooks/useSeo'

// A partir de cuántos proyectos en una fila se ofrece el botón "Ver todas".
// Con menos que esto, el carrusel ya cabe bien y no hace falta desplegarla.
const EXPAND_THRESHOLD = 6

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

// Convierte un texto de tema en un slug para la URL (sin acentos, en
// minúsculas, con guiones), p. ej. "Festivales y discotecas" → "festivales-y-discotecas".
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// slug → tema, por formato. Se usa para leer el ?tema= de la URL.
const SLUG_TO_THEME = Object.fromEntries(
  Object.entries(THEMES_BY_FORMAT).map(([format, themes]) => [
    format,
    Object.fromEntries(themes.map((t) => [slugify(t), t])),
  ])
)

export default function Portfolio() {
  useSeo({
    title: 'Portfolio — Vídeo y fotografía de eventos y festivales | CONCA Films',
    description:
      'Trabajos de CONCA Films: spots, vídeos de evento, cobertura de festivales y reportaje fotográfico en Cuenca y toda España. Mira nuestro portfolio audiovisual.',
    path: '/portfolio',
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const temaParam = searchParams.get('tema')
  const idParam = searchParams.get('id')
  const [active, setActive] = useState(VALID.includes(catParam) ? catParam : DEFAULT)
  // Los proyectos de cada formato se cachean aquí una vez cargados, para no
  // volver a pedirlos al cambiar de pestaña.
  const [dataByFormat, setDataByFormat] = useState({ video: null, foto: null })
  const [errorFormats, setErrorFormats] = useState({})
  const [gallery, setGallery] = useState(null) // project shown in the lightbox
  const [expandedRows, setExpandedRows] = useState(() => new Set())
  const rowRefs = useRef({})
  const handledDeepLink = useRef(false)

  function toggleRow(key, opts = {}) {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (opts.force === 'expand') next.add(key)
      else if (opts.force === 'collapse') next.delete(key)
      else if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

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
  // que no esté en la lista) caen en "Otros". Dentro de cada fila, el más
  // reciente primero (id más alto primero).
  const rows = useMemo(() => {
    const themeOrder = THEMES_BY_FORMAT[active] || []
    const byTheme = new Map()
    for (const p of projects || []) {
      const key = themeOrder.includes(p.tema) ? p.tema : 'Otros'
      if (!byTheme.has(key)) byTheme.set(key, [])
      byTheme.get(key).push(p)
    }
    for (const items of byTheme.values()) {
      items.sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
    }
    return themeOrder
      .map((label) => ({ key: label, label, slug: slugify(label), items: byTheme.get(label) || [] }))
      .filter((r) => r.items.length > 0)
  }, [projects, active])

  // Da a cada temática y cada publicación su propia URL: /portfolio?cat=..&tema=..&id=..
  function openTheme(row) {
    toggleRow(row.key, { force: 'expand' })
    setSearchParams({ cat: active, tema: row.slug })
  }

  function closeTheme(row) {
    toggleRow(row.key, { force: 'collapse' })
    const next = new URLSearchParams(searchParams)
    next.delete('tema')
    next.delete('id')
    setSearchParams(next)
  }

  function selectProject(project, row) {
    setSearchParams({ cat: active, tema: row.slug, id: String(project.id) })
  }

  // Deep link al entrar: ?tema= abre y hace scroll a esa fila; ?id= además
  // abre la galería (si es un reportaje de foto) o resalta la publicación.
  useEffect(() => {
    if (rows.length === 0) return
    if (handledDeepLink.current) return
    let targetRow = null
    if (temaParam) {
      const themeLabel = SLUG_TO_THEME[active]?.[temaParam]
      targetRow = rows.find((r) => r.key === themeLabel) || null
    }
    if (idParam) {
      const idNum = Number(idParam)
      const rowWithProject = rows.find((r) => r.items.some((p) => p.id === idNum))
      if (rowWithProject) {
        targetRow = rowWithProject
        const project = rowWithProject.items.find((p) => p.id === idNum)
        if (project && Array.isArray(project.imagenes) && project.imagenes.length > 0) {
          setGallery(project)
        }
      }
    }
    if (targetRow) {
      handledDeepLink.current = true
      toggleRow(targetRow.key, { force: 'expand' })
      // Espera al siguiente frame para que la fila ya esté expandida/pintada.
      requestAnimationFrame(() => {
        rowRefs.current[targetRow.key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [rows, temaParam, idParam, active])

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
                  {rows.map((row, i) => {
                    const expanded = expandedRows.has(row.key)
                    const canExpand = row.items.length > EXPAND_THRESHOLD
                    return (
                      <SectionReveal key={row.key} delay={i * 0.06}>
                        <div id={`tema-${row.slug}`} ref={(el) => (rowRefs.current[row.key] = el)} style={{ scrollMarginTop: '7rem' }}>
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4">
                              <span className="red-line" />
                              <h2 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-0.5px]">
                                {row.label}
                              </h2>
                            </div>
                            {canExpand && (
                              <button
                                type="button"
                                onClick={() => (expanded ? closeTheme(row) : openTheme(row))}
                                className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-body text-white/50 hover:text-white transition-colors whitespace-nowrap"
                              >
                                {expanded ? 'Ver menos' : `Ver todas (${row.items.length})`}
                                <span
                                  className="transition-transform duration-300"
                                  style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                                >
                                  <ChevronRight size={16} />
                                </span>
                              </button>
                            )}
                          </div>

                          {expanded ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.25 }}
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                              {row.items.map((p) => (
                                <ProjectCard
                                  key={p.id ?? p.titulo}
                                  project={p}
                                  onOpenGallery={setGallery}
                                  onSelect={(proj) => selectProject(proj, row)}
                                  highlighted={idParam != null && String(p.id) === idParam}
                                />
                              ))}
                            </motion.div>
                          ) : (
                            <div className="relative">
                              <div
                                className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                              >
                                {row.items.map((p) => (
                                  <div
                                    key={p.id ?? p.titulo}
                                    className="snap-start flex-shrink-0 w-[78vw] xs:w-[320px] sm:w-[340px] md:w-[380px]"
                                  >
                                    <ProjectCard
                                      project={p}
                                      onOpenGallery={setGallery}
                                      onSelect={(proj) => selectProject(proj, row)}
                                      highlighted={idParam != null && String(p.id) === idParam}
                                    />
                                  </div>
                                ))}
                              </div>
                              {/* Fade a la derecha: indica visualmente que hay más para deslizar */}
                              {row.items.length > 1 && (
                                <div
                                  className="pointer-events-none absolute top-0 right-0 bottom-2 w-14 md:w-24"
                                  style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </SectionReveal>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <Lightbox
        project={gallery}
        onClose={() => {
          setGallery(null)
          const next = new URLSearchParams(searchParams)
          next.delete('id')
          setSearchParams(next)
        }}
      />
    </Page>
  )
}

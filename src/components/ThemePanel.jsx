import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { CloseIcon } from './icons'

// Fullscreen panel listing every publication of a single theme (e.g. "Deportes"),
// video or photo alike — opened by tapping the theme name in Portfolio. Shows
// even a single item as a proper panel instead of a tiny inline row, which is
// what makes it usable on mobile.
// `row` (nullable) holds { label, items }. `onClose` dismisses it.
export default function ThemePanel({ row, onOpenGallery, onSelect, highlightId, onClose }) {
  useEffect(() => {
    if (!row) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [row, onClose])

  return createPortal(
    <AnimatePresence>
      {row && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] flex flex-col"
          style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          onClick={onClose}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between gap-4 px-6 md:px-10 py-5 flex-shrink-0 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0 flex items-center gap-3">
              <div className="min-w-0">
                <h2 className="font-heading italic text-white text-xl md:text-2xl tracking-[-0.5px] truncate">
                  {row.label}
                </h2>
                <p className="text-xs text-white/40 font-body mt-0.5">
                  {row.items.length} {row.items.length === 1 ? 'publicación' : 'publicaciones'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="liquid-glass rounded-full w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex-1 overflow-y-auto px-6 md:px-10 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {row.items.map((p) => (
                <ProjectCard
                  key={p.id ?? p.titulo}
                  project={p}
                  onOpenGallery={onOpenGallery}
                  onSelect={(proj) => onSelect(proj, row)}
                  highlighted={highlightId != null && String(p.id) === highlightId}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

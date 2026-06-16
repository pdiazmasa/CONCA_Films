import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, CloseIcon } from './icons'

// Fullscreen photo carousel for "foto" projects.
// `project` (nullable) holds { titulo, imagenes: [...] }. `onClose` dismisses it.
export default function Lightbox({ project, onClose }) {
  const images = project?.imagenes || []
  const [index, setIndex] = useState(0)

  // Reset to the first image whenever a new gallery opens.
  useEffect(() => {
    setIndex(0)
  }, [project])

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  )
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    if (!project) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose, prev, next])

  const multiple = images.length > 1

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex flex-col"
          style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          onClick={onClose}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5 flex-shrink-0">
            <div className="min-w-0">
              <p className="font-heading italic text-white text-xl md:text-2xl truncate">{project.titulo}</p>
              {multiple && (
                <p className="text-xs text-white/40 font-body mt-0.5">
                  {index + 1} / {images.length}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar galería"
              className="liquid-glass rounded-full w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Stage */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-20 pb-6 relative min-h-0">
            {multiple && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Anterior"
                className="absolute left-3 md:left-6 z-10 liquid-glass rounded-full w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronLeft />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`${project.titulo} — ${index + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[72vh] max-w-[90vw] object-contain rounded-lg"
              />
            </AnimatePresence>

            {multiple && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Siguiente"
                className="absolute right-3 md:right-6 z-10 liquid-glass rounded-full w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <ChevronRight />
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {multiple && (
            <div
              className="flex-shrink-0 flex items-center justify-center gap-2 px-6 pb-6 overflow-x-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Imagen ${i + 1}`}
                  className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border transition-all ${
                    i === index ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

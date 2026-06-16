import { useState } from 'react'
import { ExternalIcon, GalleryIcon } from './icons'

// Portfolio thumbnail with three modes:
//  - `imagenes` (array)  → opens an in-page photo carousel (onOpenGallery)
//  - `url`               → links out (e.g. YouTube) in a new tab
//  - neither             → "Próximamente" badge
// Falls back to a styled placeholder if the cover image fails to load.
export default function ProjectCard({ project, onOpenGallery }) {
  const { titulo, imagen, imagenes, url } = project
  const [imgError, setImgError] = useState(false)

  const gallery = Array.isArray(imagenes) && imagenes.length > 0
  const cover = imagen || (gallery ? imagenes[0] : null)
  const hasImg = cover && !imgError

  const cls =
    'liquid-glass rounded-[1.25rem] aspect-video relative overflow-hidden group block w-full text-left transition-transform duration-300 hover:scale-[1.02]'

  const inner = (
    <>
      {hasImg ? (
        <img
          src={cover}
          alt={titulo}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
          <p className="font-heading italic text-white/20 text-2xl">CONCA Films</p>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
        <h3 className="font-heading italic text-white text-lg tracking-[-0.5px] leading-tight">{titulo}</h3>
      </div>

      {/* Photo-count badge for galleries */}
      {gallery && (
        <div className="absolute top-3 right-3">
          <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/80 font-body inline-flex items-center gap-1.5">
            <GalleryIcon size={13} />
            {imagenes.length}
          </span>
        </div>
      )}

      {(gallery || url) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center text-white">
            {gallery ? <GalleryIcon size={18} /> : <ExternalIcon />}
          </div>
        </div>
      )}

      {!gallery && !url && (
        <div className="absolute top-3 left-3">
          <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/70 font-body uppercase tracking-wider">
            Próximamente
          </span>
        </div>
      )}
    </>
  )

  if (gallery) {
    return (
      <button type="button" onClick={() => onOpenGallery?.(project)} className={`${cls} cursor-pointer`}>
        {inner}
      </button>
    )
  }

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} cursor-pointer`}>
        {inner}
      </a>
    )
  }

  return <div className={cls}>{inner}</div>
}

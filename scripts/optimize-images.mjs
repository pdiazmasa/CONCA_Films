// Optimiza imágenes de public/uploads en el sitio (mismo nombre y formato).
// Las originales ya están respaldadas en /originals (gitignored) y en el historial git.
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// rename con reintentos: OneDrive puede bloquear el destino transitoriamente.
async function replaceWithRetries(tmp, target, tries = 8) {
  for (let i = 0; i < tries; i++) {
    try {
      await fs.rename(tmp, target)
      return
    } catch (e) {
      if (i === tries - 1) throw e
      await sleep(250 * (i + 1))
    }
  }
}

const ROOT = path.resolve('public/uploads')
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// Lado largo máximo (px) según carpeta.
function maxEdgeFor(file) {
  const p = file.replace(/\\/g, '/')
  if (p.includes('/fotos/')) return 2200
  if (p.includes('/web/')) return 1920
  if (p.includes('/videos/')) return 1600
  if (p.includes('/equipo/')) return 900
  if (p.includes('/logos/')) return 600
  return 1920 // raíz de uploads
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

function fmt(bytes) {
  return (bytes / 1048576).toFixed(2) + ' MB'
}

let totalBefore = 0
let totalAfter = 0
let count = 0
let skipped = 0

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase()
  if (!EXTS.has(ext)) continue

  const before = (await fs.stat(file)).size
  totalBefore += before

  try {
    const img = sharp(file, { failOn: 'none' })
    const meta = await img.metadata()
    const maxEdge = maxEdgeFor(file)

    let pipe = img.rotate() // respeta orientación EXIF
    if (Math.max(meta.width || 0, meta.height || 0) > maxEdge) {
      pipe = pipe.resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
    }

    if (meta.format === 'jpeg') pipe = pipe.jpeg({ quality: 80, mozjpeg: true })
    else if (meta.format === 'png') pipe = pipe.png({ compressionLevel: 9, palette: true })
    else if (meta.format === 'webp') pipe = pipe.webp({ quality: 80 })

    // Temporal en la MISMA carpeta (mismo volumen) -> rename atómico.
    const tmp = file + `.opt-tmp${ext}`
    await pipe.toFile(tmp)
    const after = (await fs.stat(tmp)).size

    // Solo reemplaza si quedó más pequeña.
    if (after < before) {
      await replaceWithRetries(tmp, file)
      totalAfter += after
      count++
      console.log(`✓ ${path.relative(ROOT, file)}  ${fmt(before)} → ${fmt(after)}  (${meta.width}x${meta.height})`)
    } else {
      totalAfter += before
      skipped++
      await fs.unlink(tmp).catch(() => {})
      console.log(`· ${path.relative(ROOT, file)}  ya óptima (${fmt(before)})`)
    }
  } catch (e) {
    totalAfter += before
    skipped++
    console.log(`! ${path.relative(ROOT, file)}  ERROR: ${e.message}`)
  }
}

console.log('\n──────────────────────────────')
console.log(`Optimizadas: ${count}   ·   Sin cambios: ${skipped}`)
console.log(`Antes:  ${fmt(totalBefore)}`)
console.log(`Después: ${fmt(totalAfter)}`)
console.log(`Ahorro: ${fmt(totalBefore - totalAfter)}  (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`)

// Post-build: añade <lastmod> a cada URL de dist/sitemap.xml con la fecha
// del build. Google usa lastmod como señal de que el contenido está vivo;
// sin él, el sitemap no aporta nada de frescura. La lista de URLs sigue
// viviendo en public/sitemap.xml (fuente única) — este script solo le
// añade la fecha en cada build, no duplica ni reordena las rutas.
import { promises as fs } from 'fs'
import path from 'path'

const DIST = path.resolve('dist')

async function main() {
  const file = path.join(DIST, 'sitemap.xml')
  let xml = await fs.readFile(file, 'utf8')
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  // Quita cualquier <lastmod> previo (por si se re-ejecuta sobre un dist
  // ya procesado) y vuelve a insertarlo justo antes de <changefreq>.
  xml = xml.replace(/\s*<lastmod>.*?<\/lastmod>\n?/g, '\n')
  xml = xml.replace(/(<loc>.*?<\/loc>)\s*\n(\s*)(<changefreq>)/g, (_, loc, indent, tag) => `${loc}\n${indent}<lastmod>${today}</lastmod>\n${indent}${tag}`)

  await fs.writeFile(file, xml, 'utf8')
  console.log(`✓ sitemap.xml con lastmod ${today}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

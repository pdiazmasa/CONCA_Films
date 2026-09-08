// Post-build: genera un index.html propio por cada ruta fija de la SPA,
// con su <title>/description/canonical/OG/Twitter correctos ya en el HTML
// (no puestos por JS al montar). Sin esto, GitHub Pages sirve /servicios,
// /portfolio, etc. con un 404 real (via 404.html) y cualquier bot que no
// ejecute JavaScript (WhatsApp, Instagram, Facebook, LinkedIn al generar
// la vista previa de un enlace, y algunos rastreadores) ve solo el título
// genérico de 404.html, nunca el contenido de la página compartida.
//
// El texto de cada ruta debe coincidir con el useSeo() de esa página
// (src/pages/*.jsx) — si cambias uno, cambia el otro a mano.
import { promises as fs } from 'fs'
import path from 'path'

const ORIGIN = 'https://concafilms.com'
const DIST = path.resolve('dist')

const ROUTES = [
  {
    path: '/',
    title: 'CONCA Films | Productora audiovisual y fotografía en Cuenca',
    description:
      'Productora audiovisual en Cuenca. Cobertura de eventos y festivales, vídeo profesional, fotografía y spots publicitarios en toda España. Calidad profesional, equipo propio y plazos marcados.',
  },
  {
    path: '/servicios',
    title: 'Servicios — Eventos, vídeo y fotografía | CONCA Films',
    description:
      'Cobertura de eventos y festivales, producción de vídeo, spots publicitarios y fotografía en Cuenca y toda España. Rodaje y postproducción con equipo propio.',
  },
  {
    path: '/portfolio',
    title: 'Portfolio — Vídeo y fotografía de eventos y festivales | CONCA Films',
    description:
      'Trabajos de CONCA Films: cobertura de eventos y festivales, vídeos, spots y fotografía en Cuenca y toda España. Mira nuestro portfolio audiovisual.',
  },
  {
    path: '/nosotros',
    title: 'Nosotros — Equipo de producción audiovisual en Cuenca | CONCA Films',
    description:
      'Somos Pedro, Pablo y Juan: equipo de producción audiovisual y fotografía en Cuenca con equipo propio. Cámaras Canon, Lumix y Sony, dron y estabilizadores para vídeo y eventos.',
  },
  {
    path: '/clientes',
    title: 'Clientes — Eventos, artistas y marcas | CONCA Films Cuenca',
    description:
      'Eventos, artistas y marcas que han confiado en CONCA Films para su producción audiovisual y fotografía en Cuenca y toda España.',
  },
  {
    path: '/contacto',
    title: 'Contacto — Productora audiovisual en Cuenca | CONCA Films',
    description:
      'Cuéntanos tu proyecto de eventos, vídeo o fotografía. Productora audiovisual en Cuenca disponible para eventos, spots y festivales en toda España. Escríbenos a concafilms@gmail.com.',
  },
]

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function applyRoute(html, route) {
  const url = ORIGIN + route.path
  const title = escapeAttr(route.title)
  const desc = escapeAttr(route.description)

  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${desc}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${desc}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/s, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/s, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s, `<meta name="twitter:description" content="${desc}" />`)

  if (/rel="canonical"/.test(html)) {
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="${url}" />`)
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
  }
  return html
}

async function main() {
  const indexPath = path.join(DIST, 'index.html')
  const baseHtml = await fs.readFile(indexPath, 'utf8')

  for (const route of ROUTES) {
    const html = applyRoute(baseHtml, route)
    if (route.path === '/') {
      await fs.writeFile(indexPath, html, 'utf8')
      console.log('✓ index.html (home)')
      continue
    }
    const dir = path.join(DIST, route.path)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html, 'utf8')
    console.log(`✓ ${route.path}/index.html`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

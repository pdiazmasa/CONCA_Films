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

// `breadcrumbLabel`: texto corto para el BreadcrumbList (JSON-LD) de esa
// ruta — se omite en "/" porque la propia home no necesita migas de pan.
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
    breadcrumbLabel: 'Servicios',
  },
  {
    path: '/portfolio',
    title: 'Portfolio — Vídeo y fotografía de eventos y festivales | CONCA Films',
    description:
      'Trabajos de CONCA Films: cobertura de eventos y festivales, vídeos, spots y fotografía en Cuenca y toda España. Mira nuestro portfolio audiovisual.',
    breadcrumbLabel: 'Portfolio',
  },
  {
    path: '/nosotros',
    title: 'Nosotros — Equipo de producción audiovisual en Cuenca | CONCA Films',
    description:
      'Somos Pedro, Pablo y Juan: equipo de producción audiovisual y fotografía en Cuenca con equipo propio. Cámaras Canon, Lumix y Sony, dron y estabilizadores para vídeo y eventos.',
    breadcrumbLabel: 'Nosotros',
  },
  {
    path: '/clientes',
    title: 'Clientes — Eventos, artistas y marcas | CONCA Films Cuenca',
    description:
      'Eventos, artistas y marcas que han confiado en CONCA Films para su producción audiovisual y fotografía en Cuenca y toda España.',
    breadcrumbLabel: 'Clientes',
  },
  {
    path: '/contacto',
    title: 'Contacto — Productora audiovisual en Cuenca | CONCA Films',
    description:
      'Cuéntanos tu proyecto de eventos, vídeo o fotografía. Productora audiovisual en Cuenca disponible para eventos, spots y festivales en toda España. Escríbenos a concafilms@gmail.com.',
    breadcrumbLabel: 'Contacto',
    // Debe coincidir EXACTAMENTE con FAQS en src/pages/Contacto.jsx — es
    // el mismo texto que ve la persona, solo que aquí también en JSON-LD
    // para que los buscadores y asistentes de IA lo lean sin ejecutar JS.
    faq: [
      {
        q: '¿En qué zonas trabajáis?',
        a: 'Tenemos sede en Cuenca y cubrimos eventos en toda España, desplazándonos allí donde nos necesitéis.',
      },
      {
        q: '¿Qué tipo de eventos cubrís?',
        a: 'Bodas, eventos corporativos, festivales, conciertos, graduaciones, inauguraciones y presentaciones, entre otros — cualquier evento que quieras que quede bien documentado.',
      },
      {
        q: '¿Qué servicios ofrecéis?',
        a: 'Cobertura de eventos, producción de vídeo, fotografía profesional y spots publicitarios, con edición propia incluida en todos los casos.',
      },
      {
        q: '¿Trabajáis con equipo propio?',
        a: 'Sí, siempre con equipo propio (cámaras Canon, Lumix y Sony, dron y estabilizadores) y sin intermediarios, de principio a fin.',
      },
      {
        q: '¿Cómo pido presupuesto?',
        a: 'Escríbenos a concafilms@gmail.com o por WhatsApp contándonos el evento (fecha, lugar y qué necesitas cubrir) y te respondemos con un presupuesto ajustado.',
      },
      {
        q: '¿Cuándo recibo el material?',
        a: 'Trabajamos con plazos de entrega marcados, que acordamos con cada cliente según el volumen del proyecto.',
      },
      {
        q: '¿Puedo ver trabajos anteriores?',
        a: 'Sí, en nuestro portfolio tenéis vídeos y fotografías de eventos, deportes, tradición y clubes que hemos cubierto.',
      },
      {
        q: '¿Quién forma el equipo de CONCA Films?',
        a: 'Pedro, Pablo y Juan. Un equipo de tres, con equipo propio (cámaras Canon, Lumix y Sony, dron y estabilizadores) y sin intermediarios.',
      },
      {
        q: '¿Podéis cubrir vídeo y fotografía a la vez en el mismo evento?',
        a: 'Sí, podemos combinar ambos servicios en la misma cobertura si el evento lo necesita.',
      },
      {
        q: '¿Tenéis experiencia con discotecas, clubes y sesiones de DJ?',
        a: 'Sí, cubrimos sesiones de DJ y vida nocturna, además de bodas, festivales, eventos corporativos y deportivos.',
      },
      {
        q: '¿Hacéis fotografía o vídeo deportivo?',
        a: 'Sí, cubrimos eventos deportivos como motociclismo, hípica y competiciones locales, entre otros.',
      },
      {
        q: '¿Grabáis spots publicitarios para marcas?',
        a: 'Sí, producimos spots publicitarios y contenido de marca, con rodaje y edición propios de principio a fin.',
      },
      {
        q: '¿Cómo es el proceso, desde que contacto hasta que recibo el material?',
        a: 'Nos escribes contándonos el evento (fecha, lugar y qué necesitas), te enviamos un presupuesto ajustado, cubrimos el evento con equipo propio y entregamos el material editado en el plazo acordado.',
      },
      {
        q: '¿Con cuánta antelación debo reservar la cobertura de mi evento?',
        a: 'Cuanto antes mejor, sobre todo en fechas de alta demanda (bodas, festivales, fin de curso). Escríbenos con tu fecha y te confirmamos disponibilidad.',
      },
      {
        q: '¿En qué formato entregáis el material?',
        a: 'Vídeo en alta calidad, listo para redes o proyección, y fotografías en alta resolución, ya editadas y seleccionadas.',
      },
      {
        q: '¿Usáis dron en las coberturas?',
        a: 'Sí, contamos con dron propio y lo incorporamos cuando el evento y la normativa del espacio lo permiten.',
      },
      {
        q: '¿Puedo pedir cambios en el montaje o en la selección final?',
        a: 'Sí, revisamos el resultado contigo y ajustamos lo necesario antes de la entrega final.',
      },
      {
        q: '¿Qué pasa si el evento se aplaza o se cancela?',
        a: 'Lo hablamos contigo caso por caso para reprogramar la cobertura sin problema.',
      },
    ],
  },
]

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// BreadcrumbList (JSON-LD): "Inicio > <breadcrumbLabel>". Habilita las migas
// de pan en los resultados de búsqueda de Google para cada ruta interior.
function buildBreadcrumbScript(route) {
  if (!route.breadcrumbLabel) return ''
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: ORIGIN + '/' },
      { '@type': 'ListItem', position: 2, name: route.breadcrumbLabel, item: ORIGIN + route.path },
    ],
  }
  return `    <script type="application/ld+json">${JSON.stringify(data)}</script>\n  `
}

// FAQPage (JSON-LD): mismas preguntas/respuestas que se ven en la página.
// Formato pregunta-respuesta corta — el que más citan buscadores y
// asistentes de IA cuando responden a preguntas sobre el negocio.
function buildFaqScript(route) {
  if (!route.faq || route.faq.length === 0) return ''
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: route.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return `    <script type="application/ld+json">${JSON.stringify(data)}</script>\n  `
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

  const breadcrumb = buildBreadcrumbScript(route)
  if (breadcrumb) {
    html = html.replace('</head>', `${breadcrumb}</head>`)
  }

  const faq = buildFaqScript(route)
  if (faq) {
    html = html.replace('</head>', `${faq}</head>`)
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

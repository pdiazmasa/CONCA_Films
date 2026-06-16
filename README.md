# CONCA Films — Web

Web de la productora audiovisual **CONCA Films**, construida con React + Vite + React Router y
Tailwind CSS. Diseño dark/cinematográfico con efecto *liquid glass*, animaciones con Framer Motion
y un campo de partículas 3D con Three.js. Pensada para desplegarse en **GitHub Pages** con dominio
personalizado **concafilms.com** (gestionado desde Cloudflare).

## Requisitos

- Node.js 18+ (probado con Node 24)

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # genera la carpeta dist/ lista para producción
npm run preview  # sirve dist/ localmente para comprobar el build
npm run deploy   # publica dist/ en GitHub Pages (rama gh-pages)
```

## Estructura

```
public/
  uploads/            ← imágenes (logos, equipo, thumbnails de portfolio)
    equipo/           ← fotos del equipo (pedro.jpg, pablo.jpg, juan.jpg)
    logos/            ← logos de clientes para el marquee
  data/portfolio.json ← proyectos del portfolio (editable sin tocar código)
  404.html            ← redirección SPA para GitHub Pages
  CNAME               ← dominio personalizado (concafilms.com)
  .nojekyll           ← evita el procesado Jekyll de GitHub Pages
src/
  components/         ← Navbar, Footer, BlurText, SectionReveal, LiquidGlass,
                        ProjectCard, ThreeBackground, CustomCursor, ...
  pages/              ← Home, Nosotros, Servicios, Portfolio, Contacto
  App.jsx, main.jsx, index.css
```

## Rutas

| Ruta         | Página     |
| ------------ | ---------- |
| `/`          | Home       |
| `/nosotros`  | Nosotros   |
| `/servicios` | Servicios  |
| `/portfolio` | Portfolio  |
| `/clientes`  | Clientes   |
| `/contacto`  | Contacto   |

La página de Servicios enlaza al portfolio filtrado con `?cat=video|foto`.

## Añadir proyectos al portfolio

Todo el portfolio se controla desde **un único archivo**: `public/data/portfolio.json`.
Las imágenes se suben a `public/uploads/`. **No hay que tocar código.** Las rutas de imagen
empiezan siempre por `/` (p. ej. `/uploads/...`) para que funcionen en cualquier página.

El portfolio tiene dos categorías: **`video`** y **`foto`**.

### 1) Vídeo (portada + enlace a YouTube)

Una tarjeta con portada que, al hacer clic, abre el vídeo en YouTube en una pestaña nueva.

1. Sube la imagen de portada a `public/uploads/`, p. ej. `public/uploads/mi-video.jpg`.
2. Añade una entrada en `portfolio.json`:

```json
{
  "id": 6,
  "titulo": "Nombre del vídeo",
  "categoria": "video",
  "imagen": "/uploads/mi-video.jpg",
  "url": "https://youtu.be/CODIGO_DEL_VIDEO"
}
```

> `url` puede ser cualquier enlace de YouTube (`https://youtu.be/...` o
> `https://www.youtube.com/watch?v=...`). Si omites `url`, la tarjeta muestra "Próximamente".

### 2) Fotografía (carrusel de imágenes)

Una tarjeta con portada que, al hacer clic, abre un **carrusel a pantalla completa** con
todas las fotos (flechas, miniaturas, teclado ←/→ y Esc para cerrar).

1. Crea una carpeta para el proyecto dentro de `public/uploads/`, p. ej.
   `public/uploads/boda-laura/`, y sube ahí todas las fotos.
2. Añade una entrada en `portfolio.json` con un array `imagenes`:

```json
{
  "id": 7,
  "titulo": "Nombre del reportaje",
  "categoria": "foto",
  "imagen": "/uploads/boda-laura/portada.jpg",
  "imagenes": [
    "/uploads/boda-laura/01.jpg",
    "/uploads/boda-laura/02.jpg",
    "/uploads/boda-laura/03.jpg",
    "/uploads/boda-laura/04.jpg"
  ]
}
```

- `imagen` = la portada que se ve en la cuadrícula (si la omites, se usa la primera de `imagenes`).
- `imagenes` = las fotos del carrusel, en el orden en que quieres mostrarlas.
- La tarjeta muestra un contador con el nº de fotos.

> En el JSON de ejemplo hay un proyecto **"Reportaje fotográfico (ejemplo)"** que puedes
> borrar o reemplazar por el tuyo cuando tengas fotos reales.

> Después de editar imágenes o el JSON, vuelve a ejecutar `npm run build` y `npm run deploy`
> para publicar los cambios.

## Imágenes pendientes de añadir

La web funciona sin ellas (muestra un *placeholder* elegante), pero para completarla añade:

- `public/uploads/equipo/juan.jpg` — foto de Juan Chacón (ahora muestra sus iniciales).
- `public/uploads/sony.png` — foto de la Sony a7 IV (ahora muestra el nombre).
- `public/uploads/logos/letanias.png` — logo Festival de Letanías.
- `public/uploads/logos/paellas.png` — logo Paellas Universitarias de Cuenca.
- `public/uploads/logos/palapa.png` — logo Palapa.

Los logos de clientes sin imagen se muestran como una pastilla de texto en el marquee.

## Despliegue en GitHub Pages

El proyecto está configurado con `base: '/'` (dominio raíz). El archivo `public/404.html`
redirige las rutas a `index.html` para que React Router funcione en GitHub Pages.

1. Crea un repositorio en GitHub y sube el código.
2. Publica con `npm run deploy` (usa `gh-pages` para subir `dist/` a la rama `gh-pages`),
   o configura GitHub Actions.
3. En **Settings → Pages**, elige la rama `gh-pages` como origen.
4. En GitHub Pages añade el dominio `concafilms.com` (el archivo `CNAME` ya lo incluye).
5. En **Cloudflare**, apunta el dominio a GitHub Pages (registros A/AAAA de GitHub Pages o
   CNAME a `usuario.github.io`). Activa el proxy/SSL según prefieras.

> El prototipo original en una sola página se conserva en `reference/index-original.html`
> (no se despliega).

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
  uploads/
    equipo/                    ← fotos del equipo + equipo.json
    material/                  ← fotos de cámaras/objetivos + material.json
    marca/                     ← logo, isotipo, hero + marca.json
    servicios/                 ← portadas de Servicios + servicios.json
    logos-clientes/            ← logos de clientes + clientes.json
    videos/                    ← portadas de vídeo + portfolio-video.json
    fotos/                     ← carpetas de reportajes + portfolio-foto.json
  404.html            ← redirección SPA para GitHub Pages
  CNAME               ← dominio personalizado (concafilms.com)
  .nojekyll           ← evita el procesado Jekyll de GitHub Pages
src/
  components/         ← Navbar, Footer, BlurText, SectionReveal, LiquidGlass,
                        ProjectCard, ThreeBackground, CustomCursor, ...
  hooks/              ← useJson, useMarca, useClients, useSeo (cargan los JSON)
  pages/              ← Home, Nosotros, Servicios, Portfolio, Clientes, Contacto
  App.jsx, main.jsx, index.css
```

Cada carpeta de imágenes tiene su propio JSON al lado, con lo que se muestra
y sus textos — para actualizar la web, sube la imagen y edita el JSON de esa
misma carpeta. No hace falta tocar nada de `src/`.

> El favicon y la imagen de vista previa al compartir el link siguen fijos
> en `index.html` (se leen antes de que cargue React, no pueden salir de
> un JSON).

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

El portfolio está dividido en **dos archivos**, uno por formato, cada uno junto a sus imágenes:

- Vídeo: `public/uploads/videos/portfolio-video.json`
- Foto: `public/uploads/fotos/portfolio-foto.json`

**No hay que tocar código.** Las rutas de imagen dentro de estos dos JSON sí llevan la ruta
completa (p. ej. `/uploads/videos/...`), a diferencia de los otros JSON (equipo, material,
marca, servicios, clientes) que solo llevan el nombre de archivo.

Cada proyecto tiene un campo **`tema`** que decide en qué fila (carrusel horizontal) aparece
dentro de su pestaña. Los temas válidos están definidos en `src/pages/Portfolio.jsx`
(`THEMES_BY_FORMAT`) — si escribes uno que no está en la lista, o te equivocas al teclearlo,
el proyecto cae en una fila "Otros" en vez de desaparecer.

### 1) Vídeo (portada + enlace a YouTube)

Una tarjeta con portada que, al hacer clic, abre el vídeo en YouTube en una pestaña nueva.

1. Sube la imagen de portada a `public/uploads/videos/`, p. ej. `mi-video.jpg`.
2. Añade una entrada en `portfolio-video.json`:

```json
{
  "id": 20,
  "titulo": "Nombre del vídeo",
  "tema": "Festivales",
  "imagen": "/uploads/videos/mi-video.jpg",
  "url": "https://youtu.be/CODIGO_DEL_VIDEO"
}
```

> `url` puede ser cualquier enlace de YouTube (`https://youtu.be/...` o
> `https://www.youtube.com/watch?v=...`). Si omites `url`, la tarjeta muestra "Próximamente".

### 2) Fotografía (carrusel de imágenes)

Una tarjeta con portada que, al hacer clic, abre un **carrusel a pantalla completa** con
todas las fotos (flechas, miniaturas, teclado ←/→ y Esc para cerrar).

1. Crea una carpeta para el proyecto dentro de `public/uploads/fotos/`, p. ej.
   `public/uploads/fotos/boda-laura/`, y sube ahí todas las fotos.
2. Añade una entrada en `portfolio-foto.json` con un array `imagenes`:

```json
{
  "id": 21,
  "titulo": "Nombre del reportaje",
  "tema": "Eventos",
  "imagen": "/uploads/fotos/boda-laura/portada.jpg",
  "imagenes": [
    "/uploads/fotos/boda-laura/01.jpg",
    "/uploads/fotos/boda-laura/02.jpg",
    "/uploads/fotos/boda-laura/03.jpg",
    "/uploads/fotos/boda-laura/04.jpg"
  ]
}
```

- `imagen` = la portada que se ve en la cuadrícula (si la omites, se usa la primera de `imagenes`).
- `imagenes` = las fotos del carrusel, en el orden en que quieres mostrarlas.
- La tarjeta muestra un contador con el nº de fotos.

> Cada proyecto necesita un `id` único dentro de su JSON. Después de editar imágenes o el
> JSON, vuelve a ejecutar `npm run build` y `npm run deploy` para publicar los cambios.

## Añadir o cambiar un cliente

1. Sube el logo a `public/uploads/logos-clientes/` (a ser posible PNG con fondo transparente:
   se muestra en escala de grises y pasa a color al pasar el ratón).
2. Añade una entrada en `public/uploads/logos-clientes/clientes.json`:

```json
{ "name": "Nombre del cliente", "logo": "archivo.png", "url": "https://..." }
```

- `logo` = solo el nombre del archivo.
- `url` = web o red social del cliente. Déjalo como `""` si no quieres que sea clicable.

Si un cliente no tiene logo, se muestra su nombre como texto.

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

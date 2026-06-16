========================================================================
  CONCA FILMS - WEB  ·  Guía rápida
========================================================================

Web de la productora audiovisual CONCA Films.
Hecha con React + Vite + React Router y Tailwind CSS.
Se despliega en GitHub Pages con el dominio concafilms.com (Cloudflare).

(Este archivo es la versión en texto plano del README.md, con el mismo
 contenido. Puedes abrirlo con el Bloc de notas.)


------------------------------------------------------------------------
1) COMANDOS (se ejecutan en una terminal, dentro de la carpeta del proyecto)
------------------------------------------------------------------------

  npm install      Instala las dependencias (solo la primera vez).
  npm run dev      Arranca el modo desarrollo en http://localhost:5173
  npm run build    Genera la carpeta dist/ lista para producción.
  npm run preview  Sirve dist/ en local para comprobar el resultado.
  npm run deploy   Publica dist/ en GitHub Pages (rama gh-pages).

  Flujo normal para publicar cambios:  npm run build  y luego  npm run deploy


------------------------------------------------------------------------
2) DÓNDE ESTÁ CADA COSA
------------------------------------------------------------------------

  public/uploads/            Imágenes (logos, equipo, portadas del portfolio)
  public/uploads/equipo/     Fotos del equipo (pedro.jpg, pablo.jpg, juan.jpg)
  public/uploads/logos/      Logos de clientes
  public/data/portfolio.json Los proyectos del portfolio (se edita a mano)
  src/                       El código de la web (no hace falta tocarlo
                             para añadir proyectos o imágenes)


------------------------------------------------------------------------
3) PÁGINAS
------------------------------------------------------------------------

  /            Inicio
  /nosotros    Nosotros (equipo y material)
  /servicios   Servicios
  /portfolio   Portfolio
  /clientes    Clientes (los que confían en nosotros)
  /contacto    Contacto


------------------------------------------------------------------------
4) AÑADIR PROYECTOS AL PORTFOLIO
------------------------------------------------------------------------

Todo el portfolio se controla desde UN archivo: public/data/portfolio.json
Las imágenes se suben a public/uploads/. No hay que tocar código.
Las rutas de imagen empiezan siempre por "/" (ejemplo: /uploads/foto.jpg).

Hay dos categorías: "video" y "foto".

  --- A) VÍDEO (portada + enlace a YouTube) ---

  Una tarjeta con portada que, al hacer clic, abre el vídeo en YouTube.

  1. Sube la portada a public/uploads/  (ej.: public/uploads/mi-video.jpg)
  2. Añade una entrada al portfolio.json:

      {
        "id": 6,
        "titulo": "Nombre del vídeo",
        "categoria": "video",
        "imagen": "/uploads/mi-video.jpg",
        "url": "https://youtu.be/CODIGO_DEL_VIDEO"
      }

  Nota: "url" puede ser https://youtu.be/...  o
  https://www.youtube.com/watch?v=...  Si no pones "url", la tarjeta
  muestra "Próximamente".

  --- B) FOTOGRAFÍA (carrusel de imágenes) ---

  Una tarjeta con portada que, al hacer clic, abre un carrusel a pantalla
  completa con todas las fotos (flechas, miniaturas, teclado y Esc).

  1. Crea una carpeta para el proyecto dentro de public/uploads/
     (ej.: public/uploads/boda-laura/) y sube ahí todas las fotos.
  2. Añade una entrada al portfolio.json con un array "imagenes":

      {
        "id": 7,
        "titulo": "Nombre del reportaje",
        "categoria": "foto",
        "imagen": "/uploads/boda-laura/portada.jpg",
        "imagenes": [
          "/uploads/boda-laura/01.jpg",
          "/uploads/boda-laura/02.jpg",
          "/uploads/boda-laura/03.jpg"
        ]
      }

  - "imagen"   = la portada que se ve en la cuadrícula.
  - "imagenes" = las fotos del carrusel, en el orden a mostrar.

  En el JSON hay un ejemplo llamado "Reportaje fotográfico (ejemplo)"
  que puedes borrar o reemplazar por el tuyo.

  Cada proyecto necesita un "id" único. Tras editar, ejecuta
  npm run build y npm run deploy para publicar.


------------------------------------------------------------------------
5) FOTOS QUE FALTAN POR AÑADIR
------------------------------------------------------------------------

La web funciona sin ellas (muestra un hueco con iniciales o el nombre),
pero para completarla, copia estos archivos con EL NOMBRE EXACTO (ojo a
mayúsculas/minúsculas) en estas carpetas:

  Foto de Juan
     Carpeta:  public/uploads/equipo/
     Nombre:   juan.jpg
     Formato:  JPG vertical (como las de Pedro y Pablo)

  Foto de la cámara Sony a7 IV
     Carpeta:  public/uploads/
     Nombre:   sony.png
     Formato:  PNG, fondo transparente u oscuro

  Logo Festival de Letanías
     Carpeta:  public/uploads/logos/
     Nombre:   letanias.png
     Formato:  PNG con fondo transparente

  Logo Paellas Universitarias de Cuenca
     Carpeta:  public/uploads/logos/
     Nombre:   paellas.png
     Formato:  PNG con fondo transparente

  Logo Palapa
     Carpeta:  public/uploads/logos/
     Nombre:   palapa.png
     Formato:  PNG con fondo transparente

El logo de Magico Man ya está puesto.
Los logos se muestran en escala de grises y pasan a color al pasar el ratón,
por eso es mejor PNG con fondo transparente.
Si algún archivo te llega en otro formato (.jpg, .svg...), renómbralo al
nombre indicado o avísame y ajusto la ruta.


------------------------------------------------------------------------
6) DESPLIEGUE EN GITHUB PAGES + CLOUDFLARE
------------------------------------------------------------------------

  - El proyecto usa base "/" (dominio raíz). El archivo public/404.html
    hace que las rutas funcionen en GitHub Pages.
  - public/CNAME ya contiene el dominio concafilms.com.

  Pasos:
  1. Sube el código a un repositorio de GitHub.
  2. Publica con:  npm run deploy   (sube dist/ a la rama gh-pages).
  3. En GitHub: Settings > Pages, elige la rama gh-pages como origen.
  4. En GitHub Pages añade el dominio concafilms.com.
  5. En Cloudflare, apunta el dominio a GitHub Pages.

El prototipo original de una sola página se guarda en
reference/index-original.html (no se publica).

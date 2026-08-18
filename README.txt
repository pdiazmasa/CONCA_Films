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

Cada carpeta de imágenes tiene su propio JSON al lado, con la lista de
lo que se muestra y sus textos. Para actualizar la web, sube la imagen a
la carpeta y edita el JSON de esa misma carpeta. No hace falta tocar
ningún archivo de src/ (el código).

  public/uploads/equipo/                Fotos del equipo (Pedro, Pablo, Juan)
  public/uploads/equipo/equipo.json     Nombre, rol, bio y redes de cada uno

  public/uploads/material/              Fotos de las cámaras/objetivos
  public/uploads/material/material.json Título y detalle de cada cámara

  public/uploads/marca/                 Logo, isotipo e imágenes del hero
  public/uploads/marca/marca.json       Qué archivo usa cada sitio

  public/uploads/servicios/               Portadas de la página Servicios
  public/uploads/servicios/servicios.json Qué imagen usa cada servicio

  public/uploads/logos-clientes/                Logos de clientes
  public/uploads/logos-clientes/clientes.json   Nombre, logo y web de cada cliente

  public/uploads/videos/                        Portadas de vídeos del portfolio
  public/uploads/videos/portfolio-video.json    Los proyectos de vídeo

  public/uploads/fotos/                         Carpetas de fotos del portfolio
  public/uploads/fotos/portfolio-foto.json      Los reportajes de fotografía

  src/  El código de la web (no hace falta tocarlo para añadir
        proyectos, fotos, clientes o material)

  IMPORTANTE: el favicon (icono de pestaña) y la imagen de vista previa
  al compartir el link (WhatsApp, redes) están fijos en index.html,
  porque se leen antes de que cargue nada de React — no salen de ningún
  JSON. Si cambias el nombre de isotipo.png o hero-1.png, avísame para
  actualizar también esas dos líneas de index.html.


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

El portfolio está dividido en DOS archivos, uno por formato (así cada
uno vive junto a sus propias imágenes):

  Vídeo:  public/uploads/videos/portfolio-video.json
  Foto:   public/uploads/fotos/portfolio-foto.json

Las imágenes se suben a public/uploads/. No hay que tocar código.
Las rutas de imagen dentro del JSON empiezan siempre por "/" (ejemplo:
/uploads/videos/foto.jpg) — a diferencia de los otros JSON (equipo,
material, marca, servicios, clientes), aquí SÍ hay que poner la ruta
completa, porque las fotos del portfolio pueden estar en subcarpetas.

  --- A) VÍDEO (portada + enlace a YouTube) ---

  Una tarjeta con portada que, al hacer clic, abre el vídeo en YouTube.

  1. Sube la portada a public/uploads/videos/  (ej.: mi-video.jpg)
  2. Añade una entrada a portfolio-video.json:

      {
        "id": 6,
        "titulo": "Nombre del vídeo",
        "tema": "Festivales",
        "imagen": "/uploads/videos/mi-video.jpg",
        "url": "https://youtu.be/CODIGO_DEL_VIDEO"
      }

  Nota: "url" puede ser https://youtu.be/...  o
  https://www.youtube.com/watch?v=...  Si no pones "url", la tarjeta
  muestra "Próximamente".

  IMPORTANTE - "tema": en el Portfolio, dentro de cada pestaña (Vídeo /
  Fotografía) los proyectos se agrupan en filas por temática, con scroll
  horizontal. El texto de "tema" tiene que ser EXACTAMENTE uno de estos
  (mayúsculas y tildes incluidas), según sea vídeo o foto:

    Vídeo:  "Spots publicitarios", "Festivales", "Creadores de contenido",
            "Eventos", "Deportes"

    Foto:   "Festivales y discotecas", "Deportes", "Eventos",
            "Fiestas populares", "Gastronomía"

  Si te equivocas al escribirlo, o pones un tema que no está en esta
  lista, ese proyecto no desaparece: cae en una fila "Otros" al final.
  Si quieres añadir un tema nuevo, dímelo y lo añado a la lista del código
  (archivo src/pages/Portfolio.jsx, THEMES_BY_FORMAT).

  --- B) FOTOGRAFÍA (carrusel de imágenes) ---

  Una tarjeta con portada que, al hacer clic, abre un carrusel a pantalla
  completa con todas las fotos (flechas, miniaturas, teclado y Esc).

  1. Crea una carpeta para el proyecto dentro de public/uploads/fotos/
     (ej.: public/uploads/fotos/boda-laura/) y sube ahí todas las fotos.
  2. Añade una entrada a portfolio-foto.json con un array "imagenes":

      {
        "id": 20,
        "titulo": "Nombre del reportaje",
        "tema": "Eventos",
        "imagen": "/uploads/fotos/boda-laura/portada.jpg",
        "imagenes": [
          "/uploads/fotos/boda-laura/01.jpg",
          "/uploads/fotos/boda-laura/02.jpg",
          "/uploads/fotos/boda-laura/03.jpg"
        ]
      }

  - "imagen"   = la portada que se ve en la cuadrícula.
  - "imagenes" = las fotos del carrusel, en el orden a mostrar.

  Cada proyecto necesita un "id" único (usa uno más alto que el mayor
  que ya exista en ese JSON). Tras editar, ejecuta npm run build y
  npm run deploy para publicar.


------------------------------------------------------------------------
5) AÑADIR O CAMBIAR UN CLIENTE
------------------------------------------------------------------------

1. Sube el logo a public/uploads/logos-clientes/ (a ser posible PNG con
   fondo transparente: el logo se muestra en escala de grises y pasa a
   color al pasar el ratón).
2. Añade una entrada a public/uploads/logos-clientes/clientes.json:

      { "name": "Nombre del cliente", "logo": "archivo.png", "url": "https://..." }

  - "logo" = solo el nombre del archivo (no hace falta la ruta completa).
  - "url"  = la web o red social del cliente. Déjalo como "" si no quieres
    que el logo sea clicable.

Si un cliente no tiene logo, se muestra su nombre como texto en su lugar.


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


------------------------------------------------------------------------
7) ACTUALIZAR PORTFOLIO
------------------------------------------------------------------------
npm run dev #para asegurarse que funciona

git add .
git commit -m "descripción del cambio"
git push
npm run deploy
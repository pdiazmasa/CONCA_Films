import useJson from './useJson'

// Loads public/uploads/marca/marca.json (logo, isotipo, imágenes del hero).
// The fallback matches today's filenames, so if the fetch is slow or fails
// the logo/hero still render instead of flashing empty.
const FALLBACK = {
  logoHorizontal: 'logo-horizontal.png',
  logoPrincipal: 'logo-principal.png',
  isotipo: 'isotipo.png',
  heroVideo: 'hero-montage.mp4',
  heroPoster: 'hero-poster.jpg',
}

export default function useMarca() {
  const { data } = useJson('uploads/marca/marca.json', FALLBACK)
  const m = { ...FALLBACK, ...data }
  return {
    logoHorizontal: `/uploads/marca/${m.logoHorizontal}`,
    logoPrincipal: `/uploads/marca/${m.logoPrincipal}`,
    isotipo: `/uploads/marca/${m.isotipo}`,
    heroVideo: `/uploads/marca/${m.heroVideo}`,
    heroPoster: `/uploads/marca/${m.heroPoster}`,
  }
}

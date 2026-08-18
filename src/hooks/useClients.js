import useJson from './useJson'

// Loads public/uploads/logos-clientes/clientes.json (junto a los propios
// logos). Usado por el marquee de clientes (Home) y la página Clientes,
// así que vive en un solo sitio en vez de duplicar el fetch.
export default function useClients() {
  const { data, loading } = useJson('uploads/logos-clientes/clientes.json', [])
  const clients = data.map((c) => ({ ...c, logo: c.logo ? `/uploads/logos-clientes/${c.logo}` : null }))
  return { clients, loading }
}

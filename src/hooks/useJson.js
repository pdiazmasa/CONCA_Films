import { useEffect, useState } from 'react'

// Generic loader for the small JSON files that live next to the images
// they describe (public/uploads/<carpeta>/<archivo>.json). Lets every
// page/section be edited by swapping JSON + images, without touching code.
//
// `path` is relative to `public/`, e.g. 'uploads/equipo/equipo.json'.
// `fallback` is what's returned while loading and if the fetch fails
// (defaults to an empty array, since most of these files are lists).
export default function useJson(path, fallback = []) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    fetch(`${import.meta.env.BASE_URL}${path}`)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setData(fallback)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return { data, loading, error }
}

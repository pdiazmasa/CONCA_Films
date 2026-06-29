import { useEffect } from 'react'

// SEO por página para la SPA: actualiza <title>, meta description,
// canonical y Open Graph al montar cada ruta. Sin dependencias externas.
const ORIGIN = 'https://concafilms.com'

function setMeta(name, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setProp(property, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function useSeo({ title, description, path = '' }) {
  useEffect(() => {
    const url = ORIGIN + path
    if (title) {
      document.title = title
      setProp('og:title', title)
      setMeta('twitter:title', title)
    }
    if (description) {
      setMeta('description', description)
      setProp('og:description', description)
      setMeta('twitter:description', description)
    }
    setProp('og:url', url)
    setCanonical(url)
  }, [title, description, path])
}

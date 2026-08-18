import { useState } from 'react'

// Renders a client logo image, falling back to the client name as text
// if there is no logo or it fails to load. If the client has a `url`,
// the whole thing becomes a link that opens the client's website in a
// new tab.
export default function ClientLogo({ client, imgClassName = '', fallbackClassName = '' }) {
  const [error, setError] = useState(false)

  const content =
    client.logo && !error ? (
      <img src={client.logo} alt={client.name} onError={() => setError(true)} className={imgClassName} />
    ) : (
      <span className={fallbackClassName}>{client.name}</span>
    )

  if (client.url) {
    return (
      <a
        href={client.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={client.name}
        className="contents"
      >
        {content}
      </a>
    )
  }

  return content
}

import { useState } from 'react'

// Renders a client logo image, falling back to the client name as text
// if there is no logo or it fails to load.
export default function ClientLogo({ client, imgClassName = '', fallbackClassName = '' }) {
  const [error, setError] = useState(false)
  if (client.logo && !error) {
    return (
      <img src={client.logo} alt={client.name} onError={() => setError(true)} className={imgClassName} />
    )
  }
  return <span className={fallbackClassName}>{client.name}</span>
}

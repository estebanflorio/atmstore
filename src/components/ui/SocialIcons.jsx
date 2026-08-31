// lucide-react sacó los íconos de marcas de sus paquetes recientes —
// estos son SVGs propios, minimalistas, en el mismo estilo de trazo (stroke).
export function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4v2H9v3h2V21h3v-6.5h2.4l.6-3H14v-2c0-.55.45-1 1-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

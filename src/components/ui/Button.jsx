export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-5 py-2.5 text-sm font-medium tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-lime text-ink hover:bg-acid',
    ghost: 'border border-line text-paper hover:border-lime hover:text-lime',
    text: 'text-paper/70 hover:text-lime'
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

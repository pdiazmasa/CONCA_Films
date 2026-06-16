// Reusable liquid-glass surface.
// variant: "default" (.liquid-glass) | "strong" (.liquid-glass-strong) | "card" (.liquid-glass-card)
const VARIANTS = {
  default: 'liquid-glass',
  strong: 'liquid-glass-strong',
  card: 'liquid-glass-card',
}

export default function LiquidGlass({
  variant = 'default',
  as: Tag = 'div',
  className = '',
  children,
  ...props
}) {
  const base = VARIANTS[variant] || VARIANTS.default
  return (
    <Tag className={`${base} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

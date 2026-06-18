import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  /** Conservé pour compatibilité d'API ; le thème sombre gère déjà les contrastes. */
  light?: boolean
  className?: string
  id?: string
}

export default function SectionHeader({ eyebrow, title, description, align = 'center', className, id }: Props) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
      )}
      <h2 id={id} className="font-display text-3xl font-extrabold md:text-4xl text-balance text-ink">
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base md:text-lg max-w-2xl text-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}

import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  id?: string
}

export default function SectionHeader({ eyebrow, title, description, align = 'center', light = false, className, id }: Props) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className={cn('mb-3 text-sm font-semibold uppercase tracking-widest', light ? 'text-accent-300' : 'text-accent')}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn('font-display text-3xl font-bold md:text-4xl text-balance', light ? 'text-white' : 'text-primary')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base md:text-lg max-w-2xl', align === 'center' && 'mx-auto', light ? 'text-slate-300' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  )
}

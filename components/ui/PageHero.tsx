import { cn } from '@/lib/utils'
import LiquidBackground from '@/components/ui/LiquidBackground'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  /** Contenu additionnel rendu au-dessus du titre (ex : fil d'Ariane). */
  children?: React.ReactNode
  align?: 'left' | 'center'
}

/** En-tête de page réutilisable, fond sombre + bulles liquides discrètes. */
export default function PageHero({ eyebrow, title, description, children, align = 'left' }: Props) {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <LiquidBackground density="subtle" className="opacity-70" />
      <div className="container-base relative z-10">
        {children}
        <div className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl')}>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl font-extrabold text-balance text-ink md:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-lg text-muted">{description}</p>}
        </div>
      </div>
    </section>
  )
}

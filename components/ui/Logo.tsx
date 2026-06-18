import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  /** Hauteur rendue en pixels (la largeur suit le ratio du logo recadré). */
  height?: number
  /** Force une variante précise au lieu du basculement automatique selon le thème. */
  variant?: 'auto' | 'light' | 'dark'
  className?: string
  priority?: boolean
}

const RATIO = 440 / 149

/**
 * Logo officiel « 2AC GROUPE ».
 *
 * - variante `light` (texte blanc) : à poser sur fond sombre.
 * - variante `dark` (encre noire) : à poser sur fond clair.
 * - `auto` (défaut) : affiche la variante blanche en thème sombre et l'encre
 *   noire en thème clair via les classes `dark:` de Tailwind (sans JS, donc
 *   aucun flash d'hydratation). Le thème sombre étant le défaut, le rendu
 *   initial est correct.
 */
export default function Logo({ height = 40, variant = 'auto', className, priority }: Props) {
  const width = Math.round(height * RATIO)
  const common = {
    width,
    height,
    priority,
    sizes: `${width}px`,
  }

  if (variant === 'light') {
    return <Image src="/logo-2ac.png" alt="2AC GROUPE" {...common} className={className} />
  }
  if (variant === 'dark') {
    return <Image src="/logo-2ac-dark.png" alt="2AC GROUPE" {...common} className={className} />
  }

  // Les éléments masqués (`hidden`) ne sont pas annoncés par les lecteurs d'écran :
  // seul le logo visible selon le thème porte le nom — pas de double lecture.
  return (
    <span className={cn('inline-flex', className)} style={{ width, height }}>
      <Image src="/logo-2ac.png" alt="2AC GROUPE" {...common} className="hidden dark:block" />
      <Image src="/logo-2ac-dark.png" alt="2AC GROUPE" {...common} className="block dark:hidden" />
    </span>
  )
}

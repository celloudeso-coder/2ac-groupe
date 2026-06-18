import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

/**
 * Classe de pastille pour une catégorie de blog.
 *
 * Style neutre basé sur les tokens thème (`ink`/`line`) afin de garantir un
 * contraste AA aussi bien en thème sombre qu'en thème clair, sans coder de
 * couleur en dur. La catégorie « principale » peut être mise en avant en rouge.
 */
export function categoryBadgeClass(highlight = false): string {
  return highlight
    ? 'badge border border-brand/25 bg-brand/15 text-brand'
    : 'badge border border-line bg-ink/10 text-ink'
}

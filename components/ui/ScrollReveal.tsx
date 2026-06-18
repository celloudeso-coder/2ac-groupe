'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  /** Décalage d'apparition en ms (pour un effet « stagger » entre éléments). */
  delay?: number
  /** Balise rendue (par défaut `div`). */
  as?: 'div' | 'li' | 'section' | 'article'
}

export default function ScrollReveal({ children, className, delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect de prefers-reduced-motion : on affiche immédiatement, sans animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = window.setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
          return () => window.clearTimeout(id)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${Math.min(delay, 600)}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

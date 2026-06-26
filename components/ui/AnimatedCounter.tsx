'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Valeur texte à afficher, ex. "10+", "99%", "2 000+", "150". */
  value: string
  duration?: number
}

/** Sépare préfixe / nombre / suffixe d'une valeur texte (ex. "2 000+" → "", 2000, "+"). */
function parseValue(value: string): { prefix: string; num: number; suffix: string } {
  const m = value.match(/^(\D*)([\d\s.,]+)(.*)$/)
  if (!m) return { prefix: '', num: NaN, suffix: value }
  const num = parseInt(m[2].replace(/[^\d]/g, ''), 10)
  return { prefix: m[1], num, suffix: m[3] }
}

/**
 * Compteur animé. La valeur FINALE est rendue côté serveur (présente dans le
 * HTML — pas de « 0 » au SSR, bon pour le SEO et le no-JS) ; l'animation
 * 0 → valeur ne se joue que sur le client, à l'entrée dans le viewport, et est
 * désactivée sous `prefers-reduced-motion`.
 */
export default function AnimatedCounter({ value, duration = 1800 }: Props) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { prefix, num, suffix } = parseValue(value)
    if (Number.isNaN(num)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          observer.unobserve(el)
          const start = performance.now()
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            if (p < 1) {
              setDisplay(prefix + Math.floor(eased * num).toLocaleString('fr-FR') + suffix)
              requestAnimationFrame(step)
            } else {
              setDisplay(value) // image finale = valeur exacte d'origine
            }
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} aria-label={value}>
      {display}
    </span>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={
        'flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/10 hover:text-ink ' +
        (className ?? '')
      }
      aria-label={mounted ? (isDark ? 'Activer le thème clair' : 'Activer le thème sombre') : 'Changer de thème'}
    >
      {/* Avant montage, on évite tout mismatch d'hydratation en rendant une icône neutre */}
      {!mounted ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : isDark ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  )
}

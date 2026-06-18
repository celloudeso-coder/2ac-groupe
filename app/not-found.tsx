import Link from 'next/link'
import { Home } from 'lucide-react'
import LiquidBackground from '@/components/ui/LiquidBackground'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <LiquidBackground density="rich" />
      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-4 font-display text-8xl font-extrabold text-gradient-brand">404</p>
        <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">Page introuvable</h1>
        <p className="mt-3 max-w-md text-muted">
          La page que vous recherchez n&apos;existe pas ou a été déplacée. Vérifiez l&apos;URL ou retournez à l&apos;accueil.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/" className="btn-brand px-6 py-3">
            <Home className="h-4 w-4" aria-hidden />
            Accueil
          </Link>
          <Link href="/contact" className="btn-outline px-6 py-3">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  )
}

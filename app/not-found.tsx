import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-display text-8xl font-extrabold text-primary-100">404</p>
      <h1 className="font-display text-2xl font-bold text-primary md:text-3xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à l'accueil.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="btn-primary px-6 py-3">
          <Home className="h-4 w-4" aria-hidden />
          Accueil
        </Link>
        <Link href="/contact" className="btn-outline px-6 py-3">
          Nous contacter
        </Link>
      </div>
    </section>
  )
}

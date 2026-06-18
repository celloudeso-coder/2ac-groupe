import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from '@/components/admin/LoginForm'
import LiquidBackground from '@/components/ui/LiquidBackground'

export const metadata: Metadata = {
  title: 'Connexion — Administration',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <LiquidBackground density="rich" />
      <div className="relative z-10 flex w-full justify-center">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'Administration',
    template: '%s — Admin 2AC GROUPE',
  },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </>
  )
}

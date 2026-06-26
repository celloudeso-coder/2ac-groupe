'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Layers,
  Building2,
  Newspaper,
  Quote,
  Users,
  Gem,
  BarChart3,
  History,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import { signOut } from '@/app/admin/actions'

const NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/realisations', label: 'Réalisations', icon: Building2 },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/temoignages', label: 'Témoignages', icon: Quote },
  { href: '/admin/equipe', label: 'Équipe', icon: Users },
  { href: '/admin/values', label: 'Valeurs', icon: Gem },
  { href: '/admin/stats', label: 'Statistiques', icon: BarChart3 },
  { href: '/admin/timeline_events', label: 'Histoire', icon: History },
  { href: '/admin/demandes', label: 'Demandes', icon: Inbox, badgeKey: 'demandes' as const },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export default function AdminShell({
  email,
  pendingCount,
  children,
}: {
  email: string | null
  pendingCount: number
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const navList = (
    <nav className="flex-1 space-y-1 px-3" aria-label="Navigation administration">
      {NAV.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              active ? 'bg-brand/15 text-brand' : 'text-muted hover:bg-ink/5 hover:text-ink'
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
            <span className="flex-1">{item.label}</span>
            {item.badgeKey === 'demandes' && pendingCount > 0 && (
              <span className="badge-brand px-2 py-0.5 text-[10px]">{pendingCount}</span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  const sidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/admin" className="flex items-center" aria-label="Administration 2AC GROUPE">
          <Logo height={40} />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-ink/10 lg:hidden"
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      {navList}
      <div className="mt-auto space-y-1 border-t border-line p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <ExternalLink className="h-[18px] w-[18px]" aria-hidden />
          Voir le site
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden />
            Se déconnecter
          </button>
        </form>
        {email && <p className="truncate px-3 pt-2 text-xs text-faint">{email}</p>}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-surface lg:block">
        {sidebarInner}
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-line bg-surface">
            {sidebarInner}
          </aside>
        </div>
      )}

      {/* Topbar mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/10"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <Logo height={34} />
        <span className="w-10" aria-hidden />
      </header>

      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/data'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'BTP', href: '/services/btp' },
      { label: 'Commerce général', href: '/services/commerce-general' },
      { label: 'Logistique & Transport', href: '/services/logistique-transport' },
      { label: 'Import-Export', href: '/services/import-export' },
      { label: 'Conseil & Services', href: '/services/conseil' },
    ],
  },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur shadow-sm'
          : 'bg-white/95 backdrop-blur'
      )}
      role="banner"
    >
      {/* Top bar */}
      <div className="hidden border-b border-slate-100 bg-primary md:block">
        <div className="container-base flex items-center justify-between py-2 text-xs text-white/80">
          <span>Lun–Ven : {SITE_CONFIG.hours.mon_fri} · Sam : {SITE_CONFIG.hours.sat}</span>
          <a
            href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 font-medium text-white transition-colors hover:text-accent-300"
          >
            <Phone className="h-3 w-3" aria-hidden />
            {SITE_CONFIG.phones[0]}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav aria-label="Navigation principale" className="container-base">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-primary" aria-label="2AC SARL — Accueil">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary text-white text-sm font-black">
              2AC
            </span>
            <span className="hidden sm:block">
              2AC <span className="text-accent">SARL</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.href} className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setServicesOpen(false)
                      }
                    }}
                    className={cn(
                      'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                      pathname.startsWith('/services') ? 'text-primary' : 'text-slate-600'
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} aria-hidden />
                  </button>
                  {servicesOpen && (
                    <ul
                      className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-white py-2 shadow-lg ring-1 ring-slate-900/5"
                      role="menu"
                    >
                      <li role="none">
                        <Link
                          href="/services"
                          className="flex px-4 py-2 text-sm font-semibold text-primary hover:bg-surface"
                          role="menuitem"
                        >
                          Tous nos services
                        </Link>
                      </li>
                      <li role="none" className="my-1 border-t border-slate-100" />
                      {link.children.map((child) => (
                        <li key={child.href} role="none">
                          <Link
                            href={child.href}
                            className={cn(
                              'flex px-4 py-2 text-sm transition-colors hover:bg-surface hover:text-primary',
                              pathname === child.href ? 'text-primary font-medium' : 'text-slate-600'
                            )}
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-slate-600'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* CTA */}
          <Link
            href="/contact#devis"
            className="hidden lg:inline-flex btn-accent text-sm px-5 py-2.5"
          >
            Demander un devis
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-slate-100 py-4 lg:hidden">
            <ul className="space-y-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      pathname === link.href || (link.children && pathname.startsWith('/services'))
                        ? 'bg-primary-50 text-primary'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="ml-4 mt-1 space-y-1 border-l-2 border-primary-100 pl-4" role="list">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block rounded-md px-3 py-2 text-sm transition-colors',
                              pathname === child.href
                                ? 'text-primary font-medium'
                                : 'text-slate-600 hover:text-primary'
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3 px-4">
              <a
                href={`tel:${SITE_CONFIG.phones[0].replace(/\s/g, '')}`}
                className="btn-outline flex-1 py-2.5 text-sm"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Appeler
              </a>
              <Link href="/contact#devis" className="btn-accent flex-1 py-2.5 text-sm">
                Devis gratuit
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

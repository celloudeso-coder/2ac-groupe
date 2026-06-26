'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import ThemeToggle from '@/components/theme/ThemeToggle'

interface HeaderProps {
  phone: string
  hours: { mon_fri: string; sat: string; sun: string }
}

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  {
    label: 'Nos pôles',
    href: '/services',
    children: [
      { label: 'BTP & Construction', sublabel: 'Bâtiment & travaux publics', href: '/services/btp' },
      { label: 'PLANÈTE', sublabel: 'Carrelages & finitions', href: '/services/commerce-general' },
      { label: '2AC TRANSIT', sublabel: 'Transport & logistique', href: '/services/2ac-transit' },
      { label: '2AC CleanTech', sublabel: 'Nettoyage & assainissement', href: '/services/cleantech' },
      { label: 'Ferrorail (FRS)', sublabel: 'Ferroviaire & énergie', href: '/services/ferrorail' },
    ],
  },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header({ phone, hours }: HeaderProps) {
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
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        'bg-background/80 supports-[backdrop-filter]:bg-background/55 backdrop-blur-xl',
        scrolled ? 'border-line shadow-[0_8px_30px_rgb(0_0_0/0.35)]' : 'border-transparent'
      )}
      role="banner"
    >
      {/* Top bar */}
      <div className="hidden border-b border-line/60 md:block">
        <div className="container-base flex items-center justify-between py-2 text-xs text-muted">
          <span>Lun–Ven : {hours.mon_fri} · Sam : {hours.sat}</span>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-brand"
          >
            <Phone className="h-3 w-3" aria-hidden />
            {phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav aria-label="Navigation principale" className="container-base">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="2AC GROUPE — Accueil">
            <Logo height={50} priority />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.href} className="relative">
                  <button
                    type="button"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setServicesOpen(false)
                      }
                    }}
                    className={cn(
                      'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand',
                      pathname.startsWith('/services') ? 'text-brand' : 'text-muted'
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} aria-hidden />
                  </button>
                  {servicesOpen && (
                    <ul
                      className="absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-line bg-surface-2 py-2 shadow-glass"
                      role="menu"
                    >
                      <li role="none">
                        <Link
                          href="/services"
                          className="block px-4 py-2 text-sm font-semibold text-brand hover:bg-ink/5"
                          role="menuitem"
                        >
                          Tous nos pôles
                        </Link>
                      </li>
                      <li role="none" className="my-1 border-t border-line" />
                      {link.children.map((child) => (
                        <li key={child.href} role="none">
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 leading-snug transition-colors hover:bg-ink/5',
                              pathname === child.href && 'bg-ink/5'
                            )}
                            role="menuitem"
                          >
                            <span
                              className={cn(
                                'block text-sm font-semibold',
                                pathname === child.href ? 'text-brand' : 'text-ink'
                              )}
                            >
                              {child.label}
                            </span>
                            {child.sublabel && (
                              <span className="mt-0.5 block text-xs text-faint">{child.sublabel}</span>
                            )}
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
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand',
                      pathname === link.href ? 'text-brand' : 'text-muted'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            {/* CTA */}
            <Link href="/contact#devis" className="hidden lg:inline-flex btn-brand text-sm px-5 py-2.5">
              Demander un devis
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/10 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-line bg-background py-4 lg:hidden">
            <ul className="space-y-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      pathname === link.href || (link.children && pathname.startsWith('/services'))
                        ? 'bg-brand/10 text-brand'
                        : 'text-ink hover:bg-ink/5'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="ml-4 mt-1 space-y-1 border-l-2 border-brand/30 pl-4" role="list">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block rounded-md px-3 py-2 leading-snug transition-colors',
                              pathname === child.href ? 'bg-ink/5' : 'hover:bg-ink/5'
                            )}
                          >
                            <span
                              className={cn(
                                'block text-sm font-medium',
                                pathname === child.href ? 'text-brand' : 'text-ink'
                              )}
                            >
                              {child.label}
                            </span>
                            {child.sublabel && (
                              <span className="block text-xs text-faint">{child.sublabel}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-3 px-4">
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="btn-outline flex-1 py-2.5 text-sm"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Appeler
              </a>
              <Link href="/contact#devis" className="btn-brand flex-1 py-2.5 text-sm">
                Devis gratuit
              </Link>
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

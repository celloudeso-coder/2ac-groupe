'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

type Variant = 'primary' | 'accent' | 'outline' | 'outline-white' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
}

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never
  children: React.ReactNode
}

interface LinkProps extends BaseProps {
  href: string
  external?: boolean
  children: React.ReactNode
}

type Props = ButtonProps | LinkProps

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  outline: 'btn-outline',
  'outline-white': 'btn-outline-white',
  ghost: 'btn-ghost',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: '',
  lg: 'px-8 py-4 text-base',
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  const classes = cn(variants[variant], size !== 'md' && sizes[size], className)

  if ('href' in props && props.href) {
    const { href, external, ...rest } = props as LinkProps
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      )
    }
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

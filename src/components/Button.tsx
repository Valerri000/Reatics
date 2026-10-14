import React from 'react'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-deep',
  secondary: 'border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-white',
} as const

type ButtonProps = {
  variant?: keyof typeof variants
  href?: string
  children: React.ReactNode
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>

export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex h-12 items-center justify-center rounded-none px-6 text-base font-bold disabled:cursor-not-allowed disabled:border-0 disabled:bg-line disabled:text-placeholder disabled:hover:bg-line md:h-14 ${variants[variant]} ${className}`

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

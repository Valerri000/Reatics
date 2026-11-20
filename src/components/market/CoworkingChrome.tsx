'use client'

import Link from 'next/link'
import { useState } from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { PageMenu } from '@/components/header/PageMenu'
import { MenuIcon } from '@/components/icons'
import { accountLinks, canList } from '@/lib/access'

const nav = [
  { href: '/featured', label: 'Marketplace' },
  { href: '/coworking', label: 'Coworking' },
  { href: '/brokers', label: 'Brokers' },
] as const

export function CoworkingHeader() {
  const auth = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const user = auth.user
  const listing = canList(user)

  function addListing() {
    setMenuOpen(false)
    if (user && listing) {
      window.location.href = '/account/listings'
      return
    }
    auth.openRegister()
  }

  return (
    <>
      <header
        className={`sticky top-0 border-b border-blue-50 bg-white/80 backdrop-blur-xl ${menuOpen ? 'z-30' : 'z-[100]'}`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 md:gap-12">
            <button
              className="flex h-10 w-10 items-center justify-center text-slate-500 md:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
            <Link href="/" className="text-2xl font-black tracking-tighter no-underline">
              <span className="text-brand">REATICS</span>
              <span className="text-blue-200">.</span>
            </Link>
            <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`no-underline ${item.href === '/coworking' ? 'border-b-2 border-brand py-1' : 'group'}`}
                >
                  <span className={item.href === '/coworking' ? 'text-brand' : 'text-slate-500 group-hover:text-brand'}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:18885189168"
              className="hidden items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 no-underline lg:flex"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
              <span className="text-xs font-black uppercase tracking-widest text-brand">1-888-518-9168</span>
            </a>
            {user ? (
              <Link href="/account/profile" className="rounded-full bg-brand px-8 py-2.5 text-sm font-black no-underline shadow-xl shadow-brand/20 hover:bg-brand-deep">
                <span className="text-white">{user.firstName || 'Account'}</span>
              </Link>
            ) : (
              <button
                className="rounded-full bg-brand px-8 py-2.5 text-sm font-black text-white shadow-xl shadow-brand/20 hover:bg-brand-deep"
                onClick={auth.openSignIn}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      <PageMenu
        open={menuOpen}
        signedIn={Boolean(user)}
        showAddListing={!user || listing}
        accountItems={accountLinks(user)}
        onClose={() => setMenuOpen(false)}
        onAddListing={addListing}
        onSignOut={() => {
          setMenuOpen(false)
          void auth.signOutUser()
        }}
      />
    </>
  )
}

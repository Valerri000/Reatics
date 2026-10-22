'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { AccountMenu } from '@/components/header/AccountMenu'
import { MailPanel, PhoneBar, PhonePanel } from '@/components/header/ContactPanels'
import { PageMenu } from '@/components/header/PageMenu'
import { MenuIcon } from '@/components/icons'
import { Wordmark } from '@/components/Wordmark'
import { accountLinks, canList } from '@/lib/access'

export function Header() {
  const auth = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const user = auth.user
  const listing = canList(user)
  const links = accountLinks(user)

  function addListing() {
    setMenuOpen(false)
    if (user && listing) {
      window.location.href = '/account/listings'
      return
    }
    auth.openRegister()
  }

  async function signOutFromMenu() {
    setMenuOpen(false)
    await auth.signOutUser()
  }

  return (
    <>
      <header className="hidden h-[80px] items-center border-b border-line bg-white md:flex md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <button
          className="flex h-[54px] w-[54px] items-center justify-center text-ink"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
        <Link className="ml-6" href="/">
          <Wordmark />
        </Link>
        <div className="ml-auto flex items-center gap-6">
          {!user || listing ? (
            <button className="text-base font-bold text-accent" onClick={addListing}>
              Add a Listing
            </button>
          ) : null}
          <Link className="text-base font-bold text-accent" href="/brokers">
            Find a broker
          </Link>
          {user ? (
            <AccountMenu user={user} onSignOut={() => void auth.signOutUser()} />
          ) : (
            <button className="text-base font-bold text-ink" onClick={auth.openSignIn}>
              Login
            </button>
          )}
          <PhonePanel />
          <MailPanel />
        </div>
      </header>
      <div className="bg-white md:hidden">
        <div className="relative flex h-14 items-center px-inset-phone">
          <button
            className="flex h-10 w-10 items-center justify-center text-ink"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          <Link className="absolute left-1/2 -translate-x-1/2" href="/">
            <Wordmark />
          </Link>
          {user ? (
            <button
              className="ml-auto text-base font-bold text-ink"
              onClick={() => setMenuOpen(true)}
            >
              {user.firstName || 'Account'}
            </button>
          ) : (
            <button className="ml-auto text-base font-bold text-ink" onClick={auth.openSignIn}>
              Login
            </button>
          )}
        </div>
        <PhoneBar />
      </div>
      <PageMenu
        open={menuOpen}
        signedIn={Boolean(user)}
        showAddListing={!user || listing}
        accountItems={links}
        onClose={() => setMenuOpen(false)}
        onAddListing={addListing}
        onSignOut={() => void signOutFromMenu()}
      />
    </>
  )
}

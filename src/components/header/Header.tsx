'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { AccountMenu } from '@/components/header/AccountMenu'
import { MailPanel, PhoneBar } from '@/components/header/ContactPanels'
import { PageMenu } from '@/components/header/PageMenu'
import { MenuIcon, PhoneIcon } from '@/components/icons'
import { Wordmark } from '@/components/Wordmark'
import { accountLinks, canList } from '@/lib/access'
import { headerUtilityLinks } from '@/lib/siteLinks'

const loginClass =
  'rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep'

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
      <header className="sticky top-0 z-50 border-b border-line bg-white">
        <div className="flex h-16 items-center px-inset-phone md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
          <button
            className="flex h-10 w-10 items-center justify-center text-slate hover:text-brand"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          <Link className="ml-2 md:ml-4" href="/">
            <Wordmark />
          </Link>
          <div className="ml-8 hidden items-center gap-6 md:flex">
            {!user || listing ? (
              <button className="text-sm font-medium text-slate hover:text-brand" onClick={addListing}>
                Add a Listing
              </button>
            ) : null}
            <Link
              className="text-sm font-medium text-slate hover:text-brand"
              href={headerUtilityLinks[0].href}
            >
              {headerUtilityLinks[0].label}
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-3 md:gap-5">
            <a
              className="hidden items-center gap-2 text-sm font-medium text-slate hover:text-brand lg:flex"
              href="tel:18885189168"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>1-888-518-9168</span>
            </a>
            <MailPanel />
            {user ? (
              <AccountMenu user={user} onSignOut={() => void auth.signOutUser()} />
            ) : (
              <button className={loginClass} onClick={auth.openSignIn}>
                Login
              </button>
            )}
          </div>
        </div>
        <PhoneBar />
      </header>
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

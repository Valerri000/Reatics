'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { PhoneNumber } from '@/components/PhoneNumber'
import { Wordmark } from '@/components/Wordmark'
import { footerAreaLinks, footerLinks } from '@/lib/siteLinks'

const inputClass =
  'h-12 w-full rounded-lg border border-line bg-white px-3 text-base text-ink outline-none placeholder:text-placeholder'

export function SiteFooter() {
  const [newsletter, setNewsletter] = useState('')
  const [newsletterError, setNewsletterError] = useState('')
  const [newsletterSaved, setNewsletterSaved] = useState(false)
  const navigation = footerLinks.slice(0, 6)
  const resources = [...footerLinks.slice(6), ...footerAreaLinks]

  function saveNewsletter(event: React.FormEvent) {
    event.preventDefault()
    if (!newsletter.trim()) {
      setNewsletterError('Enter your email address.')
      setNewsletterSaved(false)
      return
    }
    setNewsletter('')
    setNewsletterError('')
    setNewsletterSaved(true)
  }

  return (
    <footer className="border-t border-line bg-white px-inset-phone py-section-phone text-ink md:px-inset-tablet md:py-section xl:px-inset-desktop 2xl:px-inset-wide">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <Wordmark />
          <p className="m-0 mt-6 text-sm leading-6 text-slate">
            A commercial real estate search site for offices, retail, and coworking.
          </p>
        </div>
        <div>
          <p className="m-0 text-base font-bold">Navigation</p>
          <ul className="m-0 mt-4 list-none p-0">
            {navigation.map((link) => (
              <li key={link.href} className="mt-3">
                <Link href={link.href} className="text-sm text-slate hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="m-0 text-base font-bold">Resources</p>
          <ul className="m-0 mt-4 list-none p-0">
            {resources.map((link) => (
              <li key={link.href} className="mt-3">
                <Link href={link.href} className="text-sm text-slate hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="m-0 text-base font-bold">Contact Us</p>
          <p className="m-0 mt-4 text-sm leading-6 text-slate">
            201 N Brand Suite 200
            <br />
            Glendale CA, 91203
          </p>
          <p className="m-0 mt-4">
            <PhoneNumber tone="ink" size="footer" />
          </p>
          <p className="m-0 mt-2">
            <a className="text-sm text-slate hover:text-brand" href="mailto:info@reatics.com">
              info@reatics.com
            </a>
          </p>
          <p className="m-0 mt-8 text-xs font-bold uppercase text-gray">Newsletter</p>
          {newsletterSaved ? (
            <p className="m-0 mt-4 text-base text-ink">Your email has been saved.</p>
          ) : (
            <form onSubmit={saveNewsletter} className="mt-4">
              <input
                name="newsletter"
                type="email"
                value={newsletter}
                placeholder="Your email"
                onChange={(event) => setNewsletter(event.target.value)}
                className={`${inputClass} ${newsletterError ? 'border-2 border-brand' : ''}`}
              />
              <p className="m-0 mt-2 text-sm text-slate">e.g. John@email.com</p>
              {newsletterError ? <p className="m-0 mt-2 text-sm text-brand">{newsletterError}</p> : null}
              <Button className="mt-4" type="submit">
                Submit
              </Button>
            </form>
          )}
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-7xl border-t border-line pt-8 text-xs text-gray">
        © {new Date().getFullYear()} Reatics. All rights reserved.
      </p>
    </footer>
  )
}

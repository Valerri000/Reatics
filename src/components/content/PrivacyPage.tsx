import Link from 'next/link'
import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import type { Page } from '@/payload-types'

export function PrivacyPage({ h1, content }: { h1: string; content?: Page['content'] }) {
  const words = h1.trim().split(/\s+/).filter(Boolean)
  const accent = words.at(-1) || 'Privacy'
  const lead = words.slice(0, -1).join(' ')

  return (
    <div className="mesh-bg">
      <article className="mx-auto max-w-4xl px-inset-phone py-16 md:px-inset-tablet xl:px-8">
        <section className="mb-16">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-mist px-4 py-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate">Legal</span>
          </div>
          <h1 className="m-0 text-5xl font-black leading-tight tracking-tighter text-ink md:text-7xl">
            {lead ? `${lead} ` : null}
            <span className="gradient-text">{accent}</span>.
          </h1>
        </section>

        <div className="space-y-12">
          <section className="flex flex-col items-center justify-between gap-8 rounded-[2.5rem] bg-brand p-10 text-white shadow-2xl md:flex-row">
            <div className="max-w-md">
              <h2 className="m-0 mb-2 text-2xl font-black tracking-tight">Manage your information</h2>
              <p className="m-0 font-medium text-blue-100">
                Send a message to the office to ask about the information on your account.
              </p>
            </div>
            <Link href="/contact" className="rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-widest">
              <span className="text-brand">Contact</span>
            </Link>
          </section>

          <section className="rounded-[3rem] border border-mist bg-white p-10 shadow-2xl md:p-16">
            <FormattedBody value={content} />
            {content?.root?.children?.length ? null : (
              <p className="m-0 text-lg font-medium leading-relaxed text-slate">This privacy policy is not published yet.</p>
            )}
          </section>

          <div className="flex flex-col items-center justify-between gap-4 rounded-[2.5rem] border border-mist bg-sand p-8 md:flex-row">
            <p className="m-0 text-sm font-bold text-slate">Looking for another legal document?</p>
            <Link href="/terms" className="text-xs font-black uppercase tracking-widest">
              <span className="text-brand">Terms</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

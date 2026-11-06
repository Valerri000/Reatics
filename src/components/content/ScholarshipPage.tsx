import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { ScholarshipForm } from '@/components/content/ScholarshipForm'
import { scholarshipPhoto } from '@/lib/pageImages'
import type { RichTextBody } from '@/lib/richTextBody'

export function ScholarshipPage({ h1, content }: { h1: string; content?: RichTextBody | null }) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 text-center md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-4xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            Scholarship
          </p>
          <h1 className="m-0 mt-8 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">{h1}</h1>
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-[2.5rem] border border-line bg-white p-8 md:p-12">
              <FormattedBody value={content} />
            </div>
            <img src={scholarshipPhoto} alt="" className="h-80 w-full rounded-[2.5rem] object-cover" />
          </div>
          <div className="rounded-[2.5rem] border border-line bg-white p-8 md:p-12">
            <h2 className="m-0 mb-8 text-4xl font-black tracking-tight text-ink">Apply</h2>
            <ScholarshipForm />
          </div>
        </div>
      </section>
    </div>
  )
}

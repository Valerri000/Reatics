'use client'

import React, { useState } from 'react'

import { ReportFormPanel } from '@/components/listing/ReportFormPanel'
import { reportErrors, type ListingReportInput, type ReportErrors, type ReportField } from '@/lib/listingReport'
import { sendListingReport } from '@/lib/sendListingReport'

const emptyValues: Record<ReportField, string> = {
  name: '',
  email: '',
  errorType: '',
  description: '',
}

export function ReportForm({ listingId }: { listingId: number }) {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState<ReportErrors>({})
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input: ListingReportInput = { listingId, ...values }
    const next = reportErrors(input)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setPending(true)
    try {
      const result = await sendListingReport(input)
      if (!result.ok) {
        setErrors(result.errors)
        return
      }
      setSent(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <ReportFormPanel
      sent={sent}
      pending={pending}
      values={values}
      errors={errors}
      onChange={(field, value) => setValues((current) => ({ ...current, [field]: value }))}
      onSubmit={onSubmit}
    />
  )
}

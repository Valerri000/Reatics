import React from 'react'

import { reportErrorTypes, reportLogged, type ReportErrors, type ReportField } from '@/lib/listingReport'

const inputClass =
  'w-full rounded-lg border border-line bg-white px-3 text-base text-ink outline-none'

export function ReportFormPanel({
  sent,
  pending,
  values,
  errors,
  onChange,
  onSubmit,
}: {
  sent: boolean
  pending: boolean
  values: Record<ReportField, string>
  errors: ReportErrors
  onChange: (field: ReportField, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  if (sent) {
    return <p className="m-0 text-base font-semibold text-ink">{reportLogged}</p>
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <p className="m-0 text-[10px] font-black uppercase tracking-widest text-gray">Report a listing</p>
      <Field label="Name" name="name" value={values.name} error={errors.name} onChange={onChange} />
      <Field
        label="Email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={onChange}
      />
      <label className="block">
        <span className="mb-2 block text-base font-semibold text-ink">Error type</span>
        <select
          name="errorType"
          value={values.errorType}
          onChange={(event) => onChange('errorType', event.target.value)}
          className={`${inputClass} h-12 ${errors.errorType ? 'border-2 border-brand' : ''}`}
        >
          <option value="">Choose an error type</option>
          {reportErrorTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {errors.errorType ? <p className="m-0 mt-2 text-sm text-brand">{errors.errorType}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-base font-semibold text-ink">Description</span>
        <textarea
          name="description"
          value={values.description}
          rows={5}
          onChange={(event) => onChange('description', event.target.value)}
          className={`${inputClass} py-3 ${errors.description ? 'border-2 border-brand' : ''}`}
        />
        {errors.description ? <p className="m-0 mt-2 text-sm text-brand">{errors.description}</p> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-fit items-center justify-center rounded-lg bg-brand px-6 text-base font-bold text-white disabled:bg-line disabled:text-placeholder"
      >
        Send report
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
}: {
  label: string
  name: ReportField
  value: string
  error?: string
  onChange: (field: ReportField, value: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className={`${inputClass} h-12 ${error ? 'border-2 border-brand' : ''}`}
      />
      {error ? <p className="m-0 mt-2 text-sm text-brand">{error}</p> : null}
    </label>
  )
}

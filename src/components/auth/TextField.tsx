import React from 'react'

type TextFieldProps = {
  label: string
  name: string
  value: string
  placeholder: string
  error?: string
  invalid?: boolean
  type?: string
  autoComplete?: string
  aside?: React.ReactNode
  onChange: (value: string) => void
}

export function TextField({
  label,
  name,
  value,
  placeholder,
  error,
  invalid = false,
  type = 'text',
  autoComplete,
  aside,
  onChange,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 px-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate">{label}</span>
        {aside}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl bg-sand px-5 py-5 font-bold text-ink outline-none placeholder:text-gray focus:ring-2 focus:ring-brand ${
          error || invalid ? 'border-2 border-brand' : 'border border-transparent'
        }`}
      />
      {error ? <p className="mt-2 px-1 text-sm text-brand">{error}</p> : null}
    </label>
  )
}

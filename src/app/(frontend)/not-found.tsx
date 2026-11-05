import { missingPageLine } from '@/lib/legalFrames'
import { longPageClass, longPageHeading } from '@/lib/longPage'

export default function MissingPage() {
  return (
    <section className={longPageClass}>
      <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-brand">Reatics</p>
      <h1 className={`${longPageHeading} mt-4`}>{missingPageLine}</h1>
    </section>
  )
}

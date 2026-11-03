import { missingPageLine } from '@/lib/legalFrames'

export default function MissingPage() {
  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{missingPageLine}</h1>
    </section>
  )
}

import { missingPageLine } from '@/lib/legalFrames'
import { longPageClass, longPageHeading } from '@/lib/longPage'

export default function MissingPage() {
  return (
    <section className={longPageClass}>
      <h1 className={longPageHeading}>{missingPageLine}</h1>
    </section>
  )
}

import Link from 'next/link'

import { missingPageLine } from '@/lib/legalFrames'
import { longPageClass, longPageHeading } from '@/lib/longPage'

const directory = [
  {
    title: 'Search',
    links: [
      { href: '/map', label: 'Market map' },
      { href: '/commercial', label: 'Commercial' },
      { href: '/coworking', label: 'Coworking' },
    ],
  },
  {
    title: 'Listings',
    links: [
      { href: '/featured', label: 'Featured' },
      { href: '/featured?place=Glendale', label: 'Glendale' },
    ],
  },
  {
    title: 'Network',
    links: [
      { href: '/brokers', label: 'Brokers' },
      { href: '/glossary', label: 'Glossary' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/steps', label: 'Steps' },
    ],
  },
]

export default function MissingPage() {
  return (
    <div className="mesh-bg">
      <section className={`${longPageClass} relative text-center`}>
        <div className="mx-auto max-w-xl">
          <div className="mb-12 flex flex-col items-center">
            <span className="select-none text-[8rem] font-black leading-none tracking-tighter text-ink/5 md:text-[12rem]">
              404
            </span>
            <div className="relative z-10 -mt-8 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 md:-mt-12">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Navigation error</span>
            </div>
          </div>
          <h1 className={`${longPageHeading} mx-auto`}>{missingPageLine}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate">
            The listing or page you are looking for may have been moved or is not available.
          </p>
          <form action="/featured" method="get" className="mt-12 flex rounded-[2rem] border border-mist bg-white p-2 shadow-2xl">
            <input
              name="place"
              type="text"
              placeholder="Search marketplace..."
              className="min-w-0 flex-1 bg-transparent px-6 py-4 font-bold text-ink outline-none"
            />
            <button type="submit" className="rounded-[1.5rem] bg-brand px-8 font-black text-xs uppercase tracking-widest text-white">
              Search
            </button>
          </form>
          <div className="mt-6 flex items-center justify-center gap-8">
            <Link href="/" className="text-sm font-black uppercase tracking-widest">
              <span className="text-ink">Return home</span>
            </Link>
            <span className="h-4 w-px bg-line" />
            <Link href="/contact" className="text-sm font-black uppercase tracking-widest">
              <span className="text-ink">Contact</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="border-t border-mist bg-sand py-16">
        <div className="mx-auto max-w-4xl px-inset-phone md:px-inset-tablet xl:px-inset-desktop">
          <h2 className="mb-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray">Marketplace directory</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {directory.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-ink">{group.title}</h3>
                <ul className="m-0 list-none space-y-2 p-0 text-xs font-bold">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span className="text-slate">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

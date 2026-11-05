import React from 'react'

import { heroPhoto } from '@/lib/homeImages'
import { longPageClass } from '@/lib/longPage'

export function PageBanner({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <header className="relative overflow-hidden bg-ink text-white">
        <img src={heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className={`${longPageClass} relative`}>
          <h1 className="m-0 max-w-3xl text-[28px] font-extrabold leading-9 text-white xl:text-[48px] xl:leading-[56px]">
            {title}
          </h1>
        </div>
      </header>
      <div className={longPageClass}>{children}</div>
    </div>
  )
}

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
      <header className="relative aspect-[3/1] overflow-hidden bg-ink text-white">
        <img src={heroPhoto} alt="" className="cover-photo" />
        <div className="relative flex h-full items-center px-inset-phone md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
          <h1 className="m-0 max-w-xl text-[28px] font-extrabold leading-9 text-white xl:text-[48px] xl:leading-[56px]">
            {title}
          </h1>
        </div>
      </header>
      {children ? <div className={longPageClass}>{children}</div> : null}
    </div>
  )
}

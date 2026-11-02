import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { loadPublicRedirect } from '@/lib/loadPublicRedirect'
import { skipRedirectLookup } from '@/lib/publicRedirect'

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (skipRedirectLookup(pathname)) return NextResponse.next()
  try {
    const target = await loadPublicRedirect(pathname)
    if (!target) return NextResponse.next()
    if (/^https?:\/\//i.test(target.toPath)) {
      return NextResponse.redirect(target.toPath, target.statusCode)
    }
    const url = request.nextUrl.clone()
    url.pathname = target.toPath
    return NextResponse.redirect(url, target.statusCode)
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}

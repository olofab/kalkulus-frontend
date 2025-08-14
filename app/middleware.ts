// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isWelcomePage = request.nextUrl.pathname === '/welcome'
  const isPublic = isAuthPage || isWelcomePage

  if (!token) {
    // No token, redirect to welcome on first load (root or dashboard)
    if (!isPublic) {
      return NextResponse.redirect(new URL('/welcome', request.url))
    }
    return NextResponse.next()
  }

  // Optional: Validate token expiry using a helper
  const isTokenExpired = isJwtExpired(token)
  if (isTokenExpired) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}


function isJwtExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
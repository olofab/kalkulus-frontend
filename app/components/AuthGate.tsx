'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import LoadingScreen from './LoadingScreen'
import { decodeJwt } from '../lib/jwt'
import { useAppContext } from '../lib/AppContext'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAppContext()


  useEffect(() => {
    // Don't do any auth checks until AppContext loading is complete
    if (loading) return

    const publicRoutes = ['/welcome', '/login', '/auth/register', '/test']
    const token = localStorage.getItem('token')

    if (!token) {
      if (!publicRoutes.includes(pathname)) {
        router.replace('/welcome')
      }
      return
    }

    try {
      const decoded = decodeJwt(token)
      const expired = decoded.exp * 1000 < Date.now()
      if (expired) {
        router.replace('/login')
      }
    } catch {
      router.replace('/login')
    }
  }, [pathname, router, loading]) // Added loading as dependency

  if (loading) {
    return <LoadingScreen />
  }
  return <>{children}</>
}

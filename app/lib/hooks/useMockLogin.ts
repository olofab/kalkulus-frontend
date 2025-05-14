// /app/lib/hooks/useMockAuth.ts
'use client'
import { useEffect, useState } from 'react'

// Enkel mock-bruker med kundedata og moduler
type MockUser = {
  id: number
  name: string
  modules: string[]
}

export function useMockAuth() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulert innlogging
    const fakeUser: MockUser = {
      id: 1,
      name: 'Byggmester AS',
      modules: ['offers', 'inventory']
    }
    setTimeout(() => {
      setUser(fakeUser)
      setLoading(false)
    }, 300) // Simulert lastetid
  }, [])

  return { user, loading }
}

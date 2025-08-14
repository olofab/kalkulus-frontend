'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiGet } from './api'
import { Company, User } from '../types/user'

type AppContextType = {
  user: User | null
  company: Company | null
  loading: boolean
  setUser: (user: User | null) => void
  setCompany: (company: Company | null) => void
  refreshUser: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserAndCompany = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setCompany(null)
      return
    }

    try {
      const res = await apiGet('/api/me')
      setUser(res.user)
      setCompany(res.company)
    } catch {
      localStorage.removeItem('token')
      setUser(null)
      setCompany(null)
    }
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await fetchUserAndCompany()
      setLoading(false)
    }
    init()
  }, [])

  return (
    <AppContext.Provider value={{
      user,
      company,
      loading,
      setUser,
      setCompany,
      refreshUser: fetchUserAndCompany,
    }}>
      {children}
    </AppContext.Provider>
  )
}

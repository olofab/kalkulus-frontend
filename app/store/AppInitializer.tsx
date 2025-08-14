'use client'
import { useEffect } from 'react'
import { useAppStore } from './useAppStore'
import { apiGet } from '../lib/api'


export default function AppInitializer() {
  const setUser = useAppStore((s) => s.setUser)
  const setCompany = useAppStore((s) => s.setCompany)

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiGet('/api/me') // returnerer både user og company
      setUser(data.user)
      setCompany(data.company)
    }

    fetchData()
  }, [])

  return null
}
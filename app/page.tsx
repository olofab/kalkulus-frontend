'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardPage from "./dashboard/page"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])
  return (
    <DashboardPage />
  )
}

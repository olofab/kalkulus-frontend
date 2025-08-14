'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DashboardPage from "./dashboard/page"
import LoadingScreen from "./components/LoadingScreen"
import { useAppContext } from "./lib/AppContext"

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAppContext()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (loading) return // Wait for AppContext to finish loading

    const token = localStorage.getItem('token')
    if (!token || !user) {
      router.push('/welcome')
    } else {
      // User is authenticated, can show dashboard
      setIsChecking(false)
    }
  }, [router, user, loading])

  // Show loading until we're sure about authentication status
  if (loading || isChecking) {
    return <LoadingScreen />
  }

  return <DashboardPage />
}

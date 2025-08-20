'use client'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import TopHeader from './components/common/TopHeader'
import { useAppContext } from './lib/AppContext'

const PUBLIC_ROUTES = ['/login', '/auth/register']


export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const { user, loading } = useAppContext()

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isDashboard = pathname === '/dashboard'
  const showHeader = !loading && user && !isPublicRoute

  return (
    <Box>
      {showHeader && <TopHeader />}
      <Box component="main" sx={{ paddingBottom: isDashboard ? 0 : 8 }}>{children}</Box>
    </Box>
  )
}

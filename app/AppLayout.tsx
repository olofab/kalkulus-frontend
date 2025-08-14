'use client'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import TopHeader from './components/common/TopHeader'
import { useAppContext } from './lib/AppContext'
import Header from './components/common/TopHeader'

const PUBLIC_ROUTES = ['/login', '/auth/register']


export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const { user, loading } = useAppContext()

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const showHeader = !loading && user && !isPublicRoute


  return (
    <Box>
      {showHeader && <Header />}
      <Box component="main" sx={{ paddingBottom: 8 }}>{children}</Box>
    </Box>
  )
}

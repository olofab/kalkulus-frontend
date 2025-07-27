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
  const showHeader = !loading && user && !isPublicRoute


  return (
    <Box>
      {showHeader && <TopHeader userInitial={user?.name?.[0]?.toUpperCase() ?? '?'} />}
      <Box component="main" sx={{ paddingBottom: 8 }}>{children}</Box>
    </Box>
  )
}

'use client'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import TopBar from './components/TopBar'

export default function AppLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (pathname === '/offers') setValue(0)
    else if (pathname === '/offers/new') setValue(1)
  }, [pathname])

  return (
    <>
      <TopBar />
      <Box component="main" sx={{ paddingTop: 1, paddingBottom: 8 }}>{children}</Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue)
            if (newValue === 0) router.push('/offers')
            if (newValue === 1) router.push('/offers/new')
          }}
        >
          <BottomNavigationAction label="Oversikt" icon={<ListAltIcon />} />
          <BottomNavigationAction label="Nytt tilbud" icon={<AddCircleIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  )
}

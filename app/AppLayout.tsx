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
    else if (pathname === '/items') setValue(2)

  }, [pathname])

  const isLogIn = pathname === '/login';

  return (
    <>


      <Box component="main" sx={{ paddingTop: 1, paddingBottom: 8 }}>{children}</Box>

      {
        !isLogIn &&
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => {
              setValue(newValue)
              if (newValue === 0) router.push('/dashboard')
              if (newValue === 1) router.push('/offers/new')
              if (newValue === 2) router.push('/items')

            }}
          >
            <BottomNavigationAction label="Dashboard" icon={<ListAltIcon />} />
            <BottomNavigationAction label="Nytt tilbud" icon={<AddCircleIcon />} />
            <BottomNavigationAction label="Vareliste" icon={<ListAltIcon />} />

          </BottomNavigation>
        </Paper>
      }
    </>
  )
}

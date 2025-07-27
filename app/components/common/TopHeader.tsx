'use client'

import { AppBar, Toolbar, IconButton, Box, Avatar, Badge } from '@mui/material'
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, Bell, BellRing, ChevronLeft, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type HeaderProps = {
  userInitial?: string
}

export default function TopHeader({ userInitial = '?' }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const showLogo = pathname === '/' || pathname === '/dashboard';
  return (
    <AppBar position="static" color="default" elevation={0}
      sx={{
        backgroundColor: 'transparent',
        m: 0,
        p: 3
      }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          {showLogo ? (
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/timla_logo_blue.svg"
                alt="Timla logo"
                width={30}
                height={30}
              />
            </Link>
          ) : (
            <Box>
              <IconButton onClick={() => router.back()}>
                <ChevronLeft size={24} strokeWidth={2} />
              </IconButton>
              <IconButton onClick={() => router.push('/')}>
                <Home size={24} strokeWidth={2} />
              </IconButton>

            </Box>

          )}
        </Box>

        {/* Right side: Notifications and Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <BellRing size={24} strokeWidth={2} />
          </IconButton>
          <Link href="/me" style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: '#2C3E50',
                color: 'white',
                width: 30,
                height: 30,
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {userInitial}
            </Avatar>
          </Link>
        </Box>
      </Box>
    </AppBar>
  )
}

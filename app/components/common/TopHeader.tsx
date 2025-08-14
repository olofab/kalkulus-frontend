'use client'

import { useMemo, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider
} from '@mui/material'
import { ArrowLeft, MoreVertical, Home, Package, Receipt, User, Menu } from 'lucide-react'
import { useOffer } from '../../offers/hooks/useOffer'

const ROOT_ROUTES = ['/dashboard', '/items', '/offers', '/me', '/profile', '/']
const BACK_ROUTES = ['/dashboard', '/']

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const params = useParams()

  let offerId: string | undefined
  if (pathname.startsWith('/offers/')) {
    let id = params?.id || pathname.split('/')[2]
    if (Array.isArray(id)) id = id[0]
    offerId = id
  }
  // Always call the hook, but only pass id if present
  const { offer, loading: offerLoading } = useOffer(offerId)

  const offerTitle = offer?.title
  const showBack = useMemo(() => !BACK_ROUTES.includes(pathname || ''), [pathname])

  const title = useMemo(() => {
    if (pathname.startsWith('/offers/')) {
      const id = params?.id || pathname.split('/')[2]
      if (offerLoading) return 'Laster...'
      if (offerTitle) return offerTitle
      if (id && !isNaN(Number(id))) return `Tilbud #${id}`
      return 'Tilbud'
    }
    if (pathname.startsWith('/items')) return 'Vareliste'
    if (pathname.startsWith('/offers')) return 'Alle tilbud'
    if (pathname.startsWith('/me') || pathname.startsWith('/profile')) return 'Profil'
    if (pathname.startsWith('/dashboard') || pathname === '/') return 'Dashboard'
    return 'Timla'
  }, [pathname, offerTitle, offerLoading, params])


  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/dashboard')
    }
  }

  const menu = [
    { label: 'Dashboard', icon: <Home />, href: '/dashboard' },
    { label: 'Vareliste', icon: <Package />, href: '/items' },
    { label: 'Alle tilbud', icon: <Receipt />, href: '/offers' },
    { label: 'Profil', icon: <User />, href: '/me' },
  ]

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          p: 2,
          backgroundColor: theme => theme.palette.background.default

        }}
      >
        <Toolbar
          sx={{
            minHeight: 56,
            px: 1.5,
            gap: 1,
            display: 'grid',
            gridTemplateColumns: showBack ? 'auto 1fr auto' : '1fr auto',
            alignItems: 'center'
          }}
        >
          {showBack && (
            <IconButton size="small" onClick={goBack} edge="start" aria-label="Tilbake">
              <ArrowLeft size={18} />
            </IconButton>
          )}

          <Typography
            variant="h5"
            noWrap
            sx={{
              fontWeight: 700,
              justifySelf: showBack ? 'center' : 'start'
            }}
          >
            {title}
          </Typography>

          <IconButton size="small" onClick={() => setOpen(true)} edge="end" aria-label="Mer">
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Box sx={{ px: 2, py: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Navigasjon
          </Typography>
        </Box>
        <Divider />
        <List>
          {menu.map((m) => (
            <ListItemButton
              key={m.href}
              onClick={() => {
                setOpen(false)
                router.push(m.href)
              }}
            >
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  )
}

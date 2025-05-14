// /app/components/TopBar.tsx
'use client'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMockAuth } from '../lib/hooks/useMockLogin'

export default function TopBar({ title }: { title?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useMockAuth()

  const isHome = pathname === '/offers'
  const isEditPage = pathname.startsWith('/offers/') && pathname.split('/').length === 3
  const isNewPage = pathname === '/offers/new'

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    if (!title) return
    const id = pathname.split('/').pop()
    await fetch(`/api/offers/${id}`, { method: 'DELETE' })
    router.push('/offers')
  }

  const renderTitle = () => {
    if (isHome) return user?.name
    if (isNewPage) return 'Nytt tilbud'
    if (isEditPage && title) return title
    if (isEditPage) return 'Tilbud'
    return ''
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {!isHome && (
          <IconButton edge="start" onClick={() => router.back()} sx={{ color: '#fff' }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          {renderTitle()}
        </Typography>
        {isEditPage && (
          <>
            <IconButton edge="end" onClick={handleMenu} sx={{ color: '#fff' }}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleDelete}>Slett</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
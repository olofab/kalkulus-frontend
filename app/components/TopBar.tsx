// /app/components/TopBar.tsx
'use client'
import { Menu, MenuItem, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { ArrowLeft, MoreVertical } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMockAuth } from '../lib/hooks/useMockLogin'

export default function TopBar({ title }: { title?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useMockAuth()

  const isHome = pathname === '/dashboard'
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
    <>
      <AppBar position="static" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          {!isHome && (
            <IconButton
              edge="start"
              onClick={() => router.back()}
              sx={{ mr: 2 }}
            >
              <ArrowLeft />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {renderTitle()}
          </Typography>
          {isEditPage && (
            <IconButton onClick={handleMenu} size="small">
              <MoreVertical />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {isEditPage && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleDelete}>Slett</MenuItem>
        </Menu>
      )}
    </>
  )
}
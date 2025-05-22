'use client'

import { Box, Typography, IconButton, Button } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/navigation'
import BackButton from '../components/BackButton'

export default function ProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  return (
    <Box sx={{ position: 'relative', p: 3 }}>
      {/* Tilbakeknapp */}
      <BackButton />

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Din profil
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Her kommer det mer info om deg og ditt firma etter hvert.
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logg ut
        </Button>
      </Box>
    </Box>
  )
}

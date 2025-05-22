'use client'

import { Box, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/navigation'
import { IconButton } from '@mui/material'
import BackButton from '../components/BackButton'

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <Box sx={{ position: 'relative', p: 3 }}>
      {/* Tilbakeknapp */}
      <BackButton />
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Varsler
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Her kommer oppdateringer i fremtiden.
        </Typography>
      </Box>
    </Box>
  )
}

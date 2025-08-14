'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { useRouter, useParams } from 'next/navigation'

export default function OfferCreatedSuccessPage() {
  const router = useRouter()
  const { id } = useParams()

  const handleStartBefaring = () => {
    router.push(`/offers/${id}/items`)
  }

  const handleSaveAndGoBack = () => {
    router.push('/dashboard')
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Box sx={{
        backgroundColor: '#fff0f0',
        borderRadius: '50%',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4
      }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 64, color: 'primary.main' }} />
      </Box>

      <Typography variant="h4" fontWeight={700} gutterBottom color={'primary.main'}>
        Tilbud opprettet
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Hva vil du gjøre videre?
      </Typography>

      <Box width="100%" display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
          onClick={handleStartBefaring}
        >
          Start befaring nå
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
          onClick={handleSaveAndGoBack}
        >
          Lagre og gå tilbake
        </Button>
      </Box>
    </Container>
  )
}

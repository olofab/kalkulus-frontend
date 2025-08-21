'use client'

import { useState } from 'react'
import {
  Drawer,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  alpha
} from '@mui/material'
import { Download, FileText, CheckCircle } from 'lucide-react'
import { Offer } from '../../../types/offer'

interface DownloadPDFDrawerProps {
  open: boolean
  onClose: () => void
  offer: Offer
}

export default function DownloadPDFDrawer({ open, onClose, offer }: DownloadPDFDrawerProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    setError(null)

    try {
      // Call the actual PDF generation API
      const response = await fetch(`/api/offers/${offer.id}/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add JWT token
        },
        body: JSON.stringify({}) // Empty body as specified
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Kunne ikke generere PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tilbud-${offer.id}-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setDownloadComplete(true)
      setTimeout(() => {
        setDownloadComplete(false)
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ukjent feil oppstod')
    } finally {
      setDownloading(false)
    }
  }

  const handleClose = () => {
    if (!downloading) {
      setError(null)
      setDownloadComplete(false)
      onClose()
    }
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: 3,
          maxHeight: '80vh'
        }
      }}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FileText size={24} color="primary.main" />
          </Box>
          <Box>
            <Typography variant="h6">Last ned PDF</Typography>
            <Typography variant="body2" color="text.secondary">
              Tilbud #{offer.id}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Content */}
        <Box>
          <Typography variant="body1" mb={2}>
            PDF-en vil inneholde:
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} ml={2}>
            <Typography variant="body2" color="text.secondary">
              • Tilbudsdetaljer og kontaktinformasjon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Alle varer med priser ({offer.items?.length || 0} varer)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Total sum og betalingsinformasjon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Gyldighetsperiode og vilkår
            </Typography>
          </Box>
        </Box>

        {/* Error state */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 2,
              backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
              color: theme => theme.palette.error.dark, // Mørkere tekst
              border: theme => `1px solid ${alpha(theme.palette.error.main, 0.2)}`, // Subtil border
              boxShadow: 'none',
              borderRadius: 1,
              '& .MuiAlert-icon': {
                color: theme => theme.palette.error.dark, // Mørkere ikon
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Success state */}
        {downloadComplete && (
          <Alert
            severity="success"
            sx={{ 
              mt: 2,
              backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
              color: theme => theme.palette.success.dark, // Mørkere tekst
              border: theme => `1px solid ${alpha(theme.palette.success.main, 0.2)}`, // Subtil border
              boxShadow: 'none',
              borderRadius: 1,
              '& .MuiAlert-icon': {
                color: theme => theme.palette.success.dark, // Mørkere ikon
              },
            }}
            icon={<CheckCircle size={20} />}
          >
            PDF lastet ned successfully!
          </Alert>
        )}

        {/* Actions */}
        <Box display="flex" gap={2} mt={2}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={downloading}
          >
            Avbryt
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleDownloadPDF}
            disabled={downloading || downloadComplete}
            startIcon={downloading ? <CircularProgress size={20} /> : <Download size={20} />}
          >
            {downloading ? 'Genererer...' : downloadComplete ? 'Lastet ned!' : 'Last ned PDF'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

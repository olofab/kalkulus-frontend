'use client'

import { useState } from 'react'
import {
  Drawer,
  Box,
  Typography,
  Button,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material'
import { Trash2, AlertTriangle, CheckCircle } from 'lucide-react'
import { Offer } from '../../../types/offer'

interface DeleteOfferDrawerProps {
  open: boolean
  onClose: () => void
  offer: Offer
  onDelete: () => void
}

export default function DeleteOfferDrawer({ open, onClose, offer, onDelete }: DeleteOfferDrawerProps) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteOffer = async () => {
    setDeleting(true)
    setError(null)

    try {
      // Call the actual delete API
      const response = await fetch(`/api/offers/${offer.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add JWT token
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Kunne ikke slette tilbudet')
      }

      onDelete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ukjent feil oppstod')
    } finally {
      setDeleting(false)
    }
  }

  const handleClose = () => {
    if (!deleting) {
      setError(null)
      onClose()
    }
  }

  const totalValue = offer.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0

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
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Trash2 size={24} color="error.main" />
          </Box>
          <Box>
            <Typography variant="h6" color="error">
              Slett tilbud
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tilbud #{offer.id}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Warning */}
        <Alert
          severity="warning"
          icon={<AlertTriangle size={20} />}
          sx={{ mb: 2 }}
        >
          <Typography variant="body2">
            <strong>Advarsel:</strong> Denne handlingen kan ikke angres.
            All data knyttet til tilbudet vil bli permanent slettet.
          </Typography>
        </Alert>

        {/* Offer Summary */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Du er i ferd med å slette:
          </Typography>

          <Box
            sx={{
              bgcolor: 'grey.50',
              borderRadius: 2,
              p: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              {offer.customer || 'Ukjent kunde'}
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Opprettet:
              </Typography>
              <Typography variant="body2">
                {new Date(offer.createdAt).toLocaleDateString('no-NO')}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Antall varer:
              </Typography>
              <Typography variant="body2">
                {offer.items?.length || 0} stk
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Total verdi:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {totalValue.toLocaleString('no-NO')} kr
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Status:
              </Typography>
              <Typography variant="body2">
                {offer.status || 'Ukjent'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Consequences */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Dette vil slette:
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5} ml={2}>
            <Typography variant="body2" color="text.secondary">
              • Alle tilbudsdetaljer og metadata
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Alle varer og priser ({offer.items?.length || 0} varer)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Historikk og statusendringer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Eventuelle vedlegg og dokumenter
            </Typography>
          </Box>
        </Box>

        {/* Error state */}
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {/* Actions */}
        <Box display="flex" gap={2} mt={2}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={deleting}
          >
            Avbryt
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteOffer}
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={20} /> : <Trash2 size={20} />}
          >
            {deleting ? 'Sletter...' : 'Ja, slett tilbud'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

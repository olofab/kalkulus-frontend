'use client'

import { useState } from 'react'
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Divider,
  alpha
} from '@mui/material'
import { RefreshCw, CheckCircle } from 'lucide-react'
import { Offer } from '../../../types/offer'

interface UpdateStatusDrawerProps {
  open: boolean
  onClose: () => void
  offer: Offer
  onStatusUpdate: (newStatus: string) => void
}

const statusOptions = [
  { value: 'DRAFT', label: 'Utkast', color: '#90a4ae' },
  { value: 'PENDING', label: 'Venter på svar', color: '#ff9800' },
  { value: 'ACCEPTED', label: 'Akseptert', color: '#4caf50' },
  { value: 'REJECTED', label: 'Avvist', color: '#f44336' },
  { value: 'EXPIRED', label: 'Utløpt', color: '#757575' },
  { value: 'COMPLETED', label: 'Fullført', color: '#2196f3' }
]

export default function UpdateStatusDrawer({ open, onClose, offer, onStatusUpdate }: UpdateStatusDrawerProps) {
  const [selectedStatus, setSelectedStatus] = useState(offer.status || 'DRAFT')
  const [updating, setUpdating] = useState(false)
  const [updateComplete, setUpdateComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentStatusOption = statusOptions.find(option => option.value === offer.status)
  const selectedStatusOption = statusOptions.find(option => option.value === selectedStatus)

  const handleUpdateStatus = async () => {
    if (selectedStatus === offer.status) {
      onClose()
      return
    }

    setUpdating(true)
    setError(null)

    try {
      // Call the actual status update API
      const response = await fetch(`/api/offers/${offer.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add JWT token
        },
        body: JSON.stringify({ status: selectedStatus })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Kunne ikke oppdatere status')
      }

      const result = await response.json()
      onStatusUpdate(selectedStatus)
      setUpdateComplete(true)

      setTimeout(() => {
        setUpdateComplete(false)
        onClose()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ukjent feil oppstod')
    } finally {
      setUpdating(false)
    }
  }

  const handleClose = () => {
    if (!updating) {
      setError(null)
      setUpdateComplete(false)
      setSelectedStatus(offer.status || 'DRAFT')
      onClose()
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Tilbudet er under arbeid og ikke sendt til kunde'
      case 'PENDING':
        return 'Tilbudet er sendt til kunde og venter på svar'
      case 'ACCEPTED':
        return 'Kunden har akseptert tilbudet'
      case 'REJECTED':
        return 'Kunden har avvist tilbudet'
      case 'EXPIRED':
        return 'Tilbudet har gått ut på dato'
      case 'COMPLETED':
        return 'Arbeidet er fullført'
      default:
        return ''
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
            <RefreshCw size={24} color="primary.main" />
          </Box>
          <Box>
            <Typography variant="h6">Oppdater status</Typography>
            <Typography variant="body2" color="text.secondary">
              Tilbud #{offer.id}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Current Status */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Nåværende status:
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: currentStatusOption?.color || '#90a4ae'
              }}
            />
            <Typography fontWeight={500}>
              {currentStatusOption?.label || 'Ukjent'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {getStatusDescription(offer.status || 'DRAFT')}
          </Typography>
        </Box>

        {/* Status Selection */}
        <Box>
          <TextField
            select
            label="Ny status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            fullWidth
            disabled={updating}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: option.color
                    }}
                  />
                  {option.label}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          {selectedStatusOption && selectedStatus !== offer.status && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {getStatusDescription(selectedStatus)}
            </Typography>
          )}
        </Box>

        {/* Error state */}
        {error && (
          <Alert
            severity="error"
            sx={{
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
        {updateComplete && (
          <Alert
            severity="success"
            icon={<CheckCircle size={20} />}
            sx={{
              backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
              color: theme => theme.palette.success.dark, // Mørkere tekst
              border: theme => `1px solid ${alpha(theme.palette.success.main, 0.2)}`, // Subtil border
              boxShadow: 'none',
              borderRadius: 1,
              '& .MuiAlert-icon': {
                color: theme => theme.palette.success.dark, // Mørkere ikon
              },
            }}
          >
            Status oppdatert successfully!
          </Alert>
        )}

        {/* Actions */}
        <Box display="flex" gap={2} mt={2}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={updating}
          >
            Avbryt
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleUpdateStatus}
            disabled={updating || updateComplete || selectedStatus === offer.status}
            startIcon={updating ? <CircularProgress size={20} /> : <RefreshCw size={20} />}
          >
            {updating ? 'Oppdaterer...' : updateComplete ? 'Oppdatert!' : 'Oppdater status'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

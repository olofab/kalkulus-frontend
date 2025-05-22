'use client'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncIcon from '@mui/icons-material/Sync'
import { useState } from 'react'
import { Offer, OfferStatus } from '../types/offer'

export default function OfferActions({
  offer,
  onDownload,
  onDelete,
  onStatusUpdated,
}: {
  offer: Offer
  onDownload: () => void
  onDelete: (id: string | number) => void
  onStatusUpdated: () => void
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<OfferStatus>(offer.status)

  const handleChangeStatus = async () => {
    await fetch(`/api/offers/${offer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...offer, status: newStatus })
    })
    setDialogOpen(false)
    onStatusUpdated()
  }

  const actions = [
    {
      icon: <PictureAsPdfIcon fontSize="large" />,
      label: 'Last ned',
      onClick: onDownload,
    },
    {
      icon: <SyncIcon fontSize="large" />,
      label: 'Status',
      onClick: () => setDialogOpen(true),
    },
    {
      icon: <DeleteIcon fontSize="large" />,
      label: 'Slett',
      onClick: () => onDelete(offer.id),
    },
  ]

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Handlinger
        </Typography>

        <Grid container spacing={2}>
          {actions.map((action, i) => (
            <Grid item xs={4} key={i}>
              <Button
                onClick={action.onClick}
                fullWidth
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: '12px',
                  flexDirection: 'column',
                  py: 2,
                  height: 100,
                  color: '#000',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#f5f5f5' // Ingen hovereffekt
                  }
                }}
              >
                {action.icon}
                <Typography variant="caption" mt={1}>
                  {action.label}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Endre status på tilbud</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              label="Status"
              onChange={(e: SelectChangeEvent<OfferStatus>) => setNewStatus(e.target.value as OfferStatus)}
            >
              <MenuItem value="draft">Utkast</MenuItem>
              <MenuItem value="sent">Sendt</MenuItem>
              <MenuItem value="accepted">Akseptert</MenuItem>
              <MenuItem value="rejected">Avslått</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Avbryt</Button>
          <Button onClick={handleChangeStatus} variant="contained">
            Oppdater
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

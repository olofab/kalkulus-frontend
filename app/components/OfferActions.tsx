'use client'
import {
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncIcon from '@mui/icons-material/Sync'
import { useState } from 'react'
import { Offer, OfferStatus } from '../types/offer'
import axios from 'axios'

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
    await axios.put(`/api/offers/${offer.id}`, {
      ...offer,
      status: newStatus
    })
    setDialogOpen(false)
    onStatusUpdated()
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          borderRadius: 2,
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Handlinger
        </Typography>

        <List disablePadding>
          <ListItemButton onClick={onDownload}>
            <ListItemIcon>
              <PictureAsPdfIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Last ned som PDF" />
          </ListItemButton>

          <Divider />

          <ListItemButton onClick={() => setDialogOpen(true)}>
            <ListItemIcon>
              <SyncIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Endre status" />
          </ListItemButton>

          <Divider />

          <ListItemButton onClick={() => onDelete(offer.id)}>
            <ListItemIcon>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Slett tilbud" />
          </ListItemButton>
        </List>
      </Paper>

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
            Oppdater status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

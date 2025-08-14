// /app/offers/[id]/inspection/page.tsx
'use client'

import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Fab
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CategoryIcon from '@mui/icons-material/Category'
import axios from 'axios'
import { Offer } from '../../../types/offer'
import { apiGet } from '../../../lib/api'

export default function OfferInspectionPage() {
  const { id } = useParams()
  const router = useRouter()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [note, setNote] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  useEffect(() => {
    fetchOffer()
  }, [id])

  const fetchOffer = async () => {
    const res = await apiGet<Offer>(`/api/offers/${id}`)
    setOffer(res)
    setNote(res.description || '')
  }

  const handleNoteChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value)
    await axios.put(`/api/offers/${id}`, { notes: e.target.value })
  }

  const handleAddItem = () => {
    router.push(`/offers/${id}/add`)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  if (!offer) return <Box p={2}>Laster...</Box>

  const totalSum = offer.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const totalItems = offer.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Box display="flex" flexDirection="column" height="100dvh">
      <Box flex={1} overflow="auto" p={2}>
        <Typography variant="h6" gutterBottom>Notater</Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={note}
          onChange={handleNoteChange}
          placeholder="Fritekst om kunde, forhold på stedet osv."
        />

        <Typography variant="h6" gutterBottom mt={4}>Bilder</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Last opp bilde
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              style={{ height: 80, borderRadius: 4 }}
            />
          )}
        </Stack>

        <Typography variant="h6" gutterBottom mt={4}>Varer / arbeid</Typography>
        <List>
          {offer.items.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemAvatar>
                <Avatar variant="square" sx={{ bgcolor: '#f5f5f5' }}>
                  <CategoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`${item.quantity} stk x ${item.unitPrice} kr = ${formatPrice(item.unitPrice * item.quantity)}`}
              />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" fullWidth onClick={handleAddItem} sx={{ mt: 2 }}>Legg til vare</Button>
      </Box>

      {/* Sticky Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #eee',
          bgcolor: 'background.paper',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2">Antall varer: {totalItems}</Typography>
            <Typography variant="body2">Estimert totalsum: {formatPrice(totalSum)}</Typography>
          </Box>
          <Button variant="contained" onClick={() => router.push(`/offers/${id}/finalize`)}>
            Bygg tilbud
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK'
  }).format(amount)
}

// StatusSelector.tsx – Komponent for å endre status på et tilbud
'use client'
import { MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Offer } from '../types/offer'

export default function StatusSelector({ offer, currentStatus, onUpdated }: {
  offer: Offer,
  currentStatus: string,
  onUpdated: () => void
}) {
  const [status, setStatus] = useState(currentStatus)
  const handleChange = async (event: SelectChangeEvent) => {
    const newStatus = event.target.value
    setStatus(newStatus)

    await axios.put(`/api/offers/${offer.id}`, {
      ...offer,
      status: newStatus
    })

    onUpdated()
  }

  return (
    <FormControl fullWidth size="small" sx={{ mt: 2 }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={status}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value="draft">Utkast</MenuItem>
        <MenuItem value="sent">Sendt</MenuItem>
        <MenuItem value="accepted">Akseptert</MenuItem>
        <MenuItem value="rejected">Avslått</MenuItem>
      </Select>
    </FormControl>
  )
}

'use client'
import { Box, Typography, Chip, Stack, TextField } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { useState } from 'react'

export default function OfferHeaderCard({
  title,
  customer,
  status,
  date,
  onChange
}: {
  title: string
  customer: string
  status: string
  date: string
  onChange: (field: 'title' | 'customer', value: string) => void
}) {
  const [editField, setEditField] = useState<'title' | 'customer' | null>(null)
  const [localTitle, setLocalTitle] = useState(title)
  const [localCustomer, setLocalCustomer] = useState(customer)

  const handleBlur = () => {
    if (editField === 'title') onChange('title', localTitle)
    if (editField === 'customer') onChange('customer', localCustomer)
    setEditField(null)
  }

  return (
    <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'background.paper' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack spacing={1}>
          {/* Prosjektnavn */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <BusinessCenterIcon fontSize="small" />
            {editField === 'title' ? (
              <TextField
                size="small"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <Typography variant="body1" onClick={() => setEditField('title')}>
                {localTitle}
              </Typography>
            )}
          </Stack>

          {/* Kunde */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonIcon fontSize="small" />
            {editField === 'customer' ? (
              <TextField
                size="small"
                value={localCustomer}
                onChange={(e) => setLocalCustomer(e.target.value)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <Typography variant="body1" onClick={() => setEditField('customer')}>
                {localCustomer}
              </Typography>
            )}
          </Stack>

          <Typography variant="body2">
            {new Date(date).toLocaleDateString('no-NO')}
          </Typography>
        </Stack>

        <Stack spacing={1} alignItems="flex-end">
          <Chip label={getStatusTitle(status)} color={getStatusColor(status)} size="medium" />
        </Stack>
      </Stack>
    </Box>
  )
}

export function getStatusColor(status: string): "success" | "warning" | "default" | "error" {
  switch (status) {
    case 'accepted': return 'success'
    case 'sent': return 'warning'
    case 'rejected': return 'error'
    default: return 'default'
  }
}

export function getStatusTitle(status: string) {
  switch (status) {
    case 'draft': return 'Utkast'
    case 'accepted': return 'Akseptert'
    case 'sent': return 'Sent'
    case 'rejected': return 'Avslått'
    default: return 'Ukjent'
  }
}

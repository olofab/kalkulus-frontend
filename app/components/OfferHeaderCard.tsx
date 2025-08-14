'use client'
import { Box, Typography, Chip, Stack, TextField } from '@mui/material'
import { User, Building } from 'lucide-react'
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
            <Building size={16} />
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
            <User size={16} />
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
    case 'ACCEPTED': return 'success'
    case 'PENDING': return 'warning'
    case 'REJECTED': return 'error'
    case 'EXPIRED': return 'warning'
    case 'COMPLETED': return 'success'
    default: return 'default'
  }
}

export function getStatusTitle(status: string) {
  switch (status) {
    case 'DRAFT': return 'Utkast'
    case 'ACCEPTED': return 'Akseptert'
    case 'PENDING': return 'Sendt'
    case 'REJECTED': return 'Avslått'
    case 'EXPIRED': return 'Utløpt'
    case 'COMPLETED': return 'Fullført'
    default: return 'Ukjent'
  }
}

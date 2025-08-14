'use client'

import {
  Box, Button, Container, Stack, TextField, Typography
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { apiPost } from '../../lib/api'

export default function NewItemTemplatePage() {
  const [form, setForm] = useState({ name: '', unitPrice: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const name = form.name.trim()
    const price = parseFloat(form.unitPrice)

    if (!name || isNaN(price) || price <= 0) {
      setError('Skriv inn gyldig navn og pris')
      return
    }

    try {
      await apiPost('/api/items/templates', { name, unitPrice: price })
      router.push('/items/add')
    } catch (e) {
      setError('Kunne ikke lagre varen')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6, minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={4} alignItems="center" sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Typography variant="h5" fontWeight={600}>Legg til ny vare</Typography>
        <Stack spacing={2} width="100%">
          <TextField
            label="Navn på vare"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Enhetspris (kr)"
            type="number"
            value={form.unitPrice}
            onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
            fullWidth
          />
          {error && (
            <Typography color="error" fontSize={14}>{error}</Typography>
          )}
        </Stack>
      </Stack>

      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 4 }}
      >
        Lagre vare
      </Button>
    </Container>
  )
}

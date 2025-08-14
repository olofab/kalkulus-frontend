'use client'
import {
  Box, TextField, Typography, Stack, IconButton, Grid, Button, Card, CardContent
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { apiPost } from '../../../../lib/api'
import { useItemTemplatesStore } from '../../../../store/useItemTemplatesStore'
import { Item } from '../../../../types/offer'
import { ItemTemplate } from '../../../../types/itemTemplates'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Image from 'next/image'


export default function AddTaskPage() {
  const { id } = useParams()
  const router = useRouter()
  const { templates, fetchTemplates, loading, error } = useItemTemplatesStore()

  useEffect(() => {
    if (templates.length === 0 && !loading) {
      fetchTemplates()
    }
  }, [])

  if (loading) {
    return (
      <Box p={4}>
        <Typography>Laster inn maler...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">Feil: {error}</Typography>
      </Box>
    )
  }

  if (templates.length === 0) {
    return (
      <Box p={4} textAlign="center"  >
        <Stack spacing={2} alignItems="center" justifyContent={'space-around'} height={"80dvh"}>
          <Box>
            <Image src="/empty.svg" alt="Timla logo" width={250} height={250} />

            <Typography variant="h6" fontWeight={500}>Ingen varemaler funnet</Typography>
            <Typography color="text.secondary">
              Du har ikke lagret noen maler enda. Du kan legge inn varer manuelt, eller opprette en ny mal i innstillinger.
            </Typography>
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => router.push(`/items/new`)} fullWidth>
            Opprett vare
          </Button>
        </Stack>
      </Box>
    )
  }

  const handleAddItem = async (template: ItemTemplate) => {
    try {
      await apiPost(`/api/offers/${id}/item`, {
        name: template.name,
        unitPrice: template.unitPrice,
        quantity: 1
      })

      // ✅ Etter vellykket opprettelse, redirect
      router.push(`/offers/${id}/items`)
    } catch (error) {
      console.error('Kunne ikke legge til oppgave', error)
      // Her kan du legge til snackbar eller feilmelding hvis ønskelig
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight={600} mb={2}>Velg vare</Typography>

      <TextField
        placeholder="Søk"
        fullWidth
        sx={{ mb: 3 }}
      />

      <Typography variant="body2" color="text.secondary" mb={2}>Velg fra varelisten</Typography>

      <Stack spacing={2}>
        {templates.map((task, i) => (
          <Card
            key={i}
            variant="outlined"
            sx={{ cursor: 'pointer', borderColor: 'success.light' }}
            onClick={() => handleAddItem(task)}
          >
            <CardContent>
              <Typography fontWeight={600}>{task.name}</Typography>
              <Typography fontWeight={500}>{task.unitPrice.toLocaleString()} kr</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Chip,
  Button,
  Divider,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import OfferItemList from '../../components/OfferItemList'
import { deleteOffer, fetchOffer, updateOffer } from '../../lib/api'
import { Offer } from '../../types/offer'
import OfferActions from '../../components/OfferActions'
import generateOfferPdf from '../../lib/pdf/generate'
import BackButton from '../../components/BackButton'
import LoadingScreen from '../../components/LoadingScreen'


export default function OfferDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [tab, setTab] = useState(0)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: '',
    customer: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    description: ''
  })

  const getOffer = async () => {
    if (!id) return
    const res = await fetchOffer(id as string)
    setOffer(res)
    setForm({
      title: res.title,
      customer: res.customer,
      contactPerson: res.contactPerson,
      email: res.email,
      phone: res.phone,
      address: res.address,
      description: res.description || ''
    })
  }

  const handleDeleteOffer = async (id: string | number) => {
    const confirm = window.confirm('Er du sikker på at du vil slette tilbudet?')
    if (!confirm) return
    try {
      await deleteOffer(id)
      router.push('/offers') // Naviger etter sletting
    } catch (error) {
      console.error('Feil ved sletting av tilbud:', error)
      // Legg gjerne til snackbar-feilhåndtering her
    }
  }

  useEffect(() => {
    getOffer()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!offer) return
    await updateOffer(offer.id, form)
    setEditing(false)
    getOffer()
  }

  if (!offer) return <LoadingScreen />

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }} p={3}>
      <BackButton />
      <Stack spacing={2} alignItems="center" mb={3}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {offer.customer[0].toUpperCase()}
        </Box>
        {!editing ? (
          <>
            <Typography variant="h6" textAlign="center">{offer.title}</Typography>
            <Typography variant="body2" color="text.secondary">{offer.customer} / {offer.address}</Typography>
            <Chip label={getStatusTitle(offer.status)} color={getStatusColor(offer.status)} />
            <Button startIcon={<EditIcon />} onClick={() => setEditing(true)}>Rediger</Button>
          </>
        ) : (
          <Stack spacing={1} sx={{ width: '100%' }}>
            <TextField label="Prosjekttittel" name="title" value={form.title} onChange={handleChange} fullWidth />
            <TextField label="Kundenavn" name="customer" value={form.customer} onChange={handleChange} fullWidth />
            <TextField label="Adresse" name="address" value={form.address} onChange={handleChange} fullWidth />
            <Button startIcon={<SaveIcon />} variant="contained" onClick={handleSave}>Lagre</Button>
            <Button variant='text' onClick={() => {
              setEditing(false)
            }}>Lukk</Button>
          </Stack>
        )}
      </Stack>


      <Tabs value={tab} onChange={(_, val) => setTab(val)} variant="fullWidth" sx={{ mb: 2 }}>
        <Tab label="Detaljer" />
        <Tab label="Pris" />
        <Tab label="Varer" />
        <Tab label="Valg" />
      </Tabs>

      {tab === 0 && (
        <Box>
          {editing ? (
            <Stack spacing={2}>

              <TextField
                label="Beskrivelse"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
              <TextField label="Kontaktperson" name="contactPerson" value={form.contactPerson} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
              <TextField label="E-post" name="email" value={form.email} onChange={handleChange} fullWidth />
              <TextField label="Telefon" name="phone" value={form.phone} onChange={handleChange} fullWidth />
            </Stack>
          ) : (
            <>
              <Typography variant="subtitle2" gutterBottom>Beskrivelse:</Typography>
              <Typography variant="body2" color="text.secondary">{offer.description || 'Ingen beskrivelse angitt.'}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2">Kontaktperson:</Typography>
              <Typography variant="body2" color="text.secondary">{offer.contactPerson}</Typography>
              <Typography variant="body2" color="text.secondary">{offer.email} / {offer.phone}</Typography>
            </>
          )}
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>


            <Typography variant="body2" sx={{ display: 'flex', alignSelf: 'center', mr: 1 }}>Totalt:</Typography>
            <Typography variant="h6" fontWeight={600}>{offer.totalSum.toFixed(2)} kr</Typography>
          </Box>
          <OfferItemList items={offer.items} onUpdated={getOffer} />
        </Box>
      )}

      {tab === 2 && (
        <Box>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push(`/offers/${offer.id}/add`)}
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Legg til vare
          </Button>
          <OfferItemList items={offer.items} onUpdated={getOffer} />
        </Box>
      )}
      {tab === 3 && (
        <OfferActions
          offer={offer}
          onDownload={() => generateOfferPdf(offer)}
          onDelete={() => handleDeleteOffer(offer.id)}
          onStatusUpdated={() => { getOffer() }}
        />
      )}
    </Box>
  )
}

function getStatusColor(status: string): "success" | "warning" | "default" | "error" {
  switch (status) {
    case 'accepted': return 'success'
    case 'sent': return 'warning'
    case 'rejected': return 'error'
    default: return 'default'
  }
}

function getStatusTitle(status: string) {
  switch (status) {
    case 'accepted': return 'Akseptert'
    case 'sent': return 'Sent'
    case 'rejected': return 'Avslått'
    default: return 'Ukjent'
  }
}

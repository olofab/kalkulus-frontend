'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box, Button, List, ListItem, ListItemText, TextField, Typography
} from '@mui/material'
import axios from 'axios'
import AddItemFromList from '../../AddItemFromList'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import StatusSelector from '../../components/StatusSelector'
import { Item, ItemInput, Offer } from '../../types/offer'
import { deleteOffer, fetchOffer } from '../../lib/api'
import TopBar from '../../components/TopBar'
import OfferTabs from '../../components/OfferTabs'
import OfferHeaderCard from '../../components/OfferHeaderCard'
import OfferActions from '../../components/OfferActions'
import generateOfferPdf from '../../lib/pdf/generate'


export default function EditOfferPage() {
  const { id } = useParams()
  const router = useRouter()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [newItem, setNewItem] = useState<ItemInput>({ name: '', unitPrice: 0, quantity: 1 })
  const [showAddScreen, setShowAddScreen] = useState(false)

  const getOffer = async () => {
    const res = await fetchOffer(id as string);
    setOffer(res)
  }

  useEffect(() => {
    getOffer()
  }, [id])

  const addItem = async () => {
    await axios.post(`/api/offers/${id}/item`, newItem)
    await getOffer()
    setNewItem({ name: '', unitPrice: 0, quantity: 1 })
  }

  const deleteItem = async (itemId: number) => {
    await axios.delete(`/api/items/${itemId}`)
    await getOffer()
  }

  if (!offer) return <Box p={2}>Laster tilbud...</Box>
  if (showAddScreen) return (<AddItemFromList

  />)

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

  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(offer.title, 14, 22)

    doc.setFontSize(12)
    doc.text(`Status: ${offer.status}`, 14, 30)
    doc.text(`Total: ${offer.totalSum} kr`, 14, 38)

    autoTable(doc, {
      startY: 45,
      head: [['Navn', 'Antall', 'Pris/stk', 'Total']],
      body: offer.items.map((item: any) => [
        item.name,
        item.quantity,
        item.unitPrice,
        item.quantity * item.unitPrice,
      ])
    })

    doc.save(`${offer.title}.pdf`)
  }

  return (
    <Box sx={{ bgcolor: 'FAFAFA', p: 2 }}>
      <OfferHeaderCard
        title={offer.title}
        customer={offer.customer || 'Ola Normann'}
        status={offer.status}
        date={offer.updatedAt}
        onChange={(field, value) => {
          axios.put(`/api/offers/${offer.id}`, { ...offer, [field]: value }).then(() => getOffer())
        }}
      />
      <OfferTabs
        offer={offer}
        items={offer.items}
        onAddClick={() => router.push(`/offers/${offer.id}/add`)}
        onUpdated={getOffer}

      />
      <OfferActions
        offer={offer}
        onDownload={() => generateOfferPdf(offer)}
        onDelete={() => handleDeleteOffer(offer.id)}
        onStatusUpdated={() => { getOffer() }}
      />
    </Box>
  )
}

// app/offer/[id]/layout.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Container } from '@mui/material'
import Hero from '../../components/offer/main/Hero'
import { Offer } from '../../types/offer'
import AddItemDrawer from '../../components/offer/items/AddItemDrawer'
import AddNotesDrawer from '../../components/offer/items/AddNotesDrawer'
import FloatingActionMenu from '../../components/offer/items/FloatingMenu'
import OfferFAB from '../../components/TotalSumFAB'
import { AddItem, Item } from '../../components/offer/items/ItemList'
import { apiPost } from '../../lib/api'
import { useOffer } from '../hooks/useOffer'
import { useItemRefetchStore } from '../../lib/hooks/useItemRefetchStore'

export default function OfferLayout({ children }: { children: ReactNode }) {
  const { id } = useParams()
  const offerId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id)

  const [itemDrawerOpen, setItemDrawerOpen] = useState(false)
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false)

  const { offer, refetch: refetchOffer } = useOffer(offerId)
  const { trigger } = useItemRefetchStore()


  useEffect(() => {
    refetchOffer()
  }, [trigger])

  const handleAddItem = async (item: AddItem) => {
    try {
      await apiPost(`/api/offers/${offerId}/item`, item)
      useItemRefetchStore.getState().refetch() // trigger global refetch
      setItemDrawerOpen(false)
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} >
      {/* Hero always visible */}


      {/* Content below Hero */}
      <Container maxWidth="sm" sx={{ flexGrow: 1, pt: 2, pb: 10 }} >
        {children}
      </Container>

      {/* FAB Menu always visible */}


      {/* Drawers */}
      <AddItemDrawer
        open={itemDrawerOpen}
        onClose={() => setItemDrawerOpen(false)}
        onAddItem={handleAddItem}
      />
      <AddNotesDrawer
        open={notesDrawerOpen}
        onClose={() => setNotesDrawerOpen(false)}
        onAddItem={() => { }}
      />
    </Box>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box, Card, CardContent, Container,
  IconButton, List, ListItem, ListItemText,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import { useMockAuth } from '../lib/hooks/useMockLogin'

export default function OfferListPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const router = useRouter();
  const { user, loading } = useMockAuth()

  useEffect(() => {
    axios.get('/api/offers').then(res => setOffers(res.data))
  }, [])

  if (loading) return <div>Laster...</div>


  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container sx={{ mt: 2 }}>
        <List>
          {offers.map((offer) => (
            <Card key={offer.id} sx={{ my: 1 }}>
              <CardContent>
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => router.push(`/offers/${offer.id}`)}>
                      <EditIcon />
                    </IconButton>
                  }>
                  <ListItemText
                    primary={offer.title}
                    secondary={`Status: ${offer.status} | ${offer.items.length} varer | Total: ${offer.totalSum} kr`}
                  />
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </Box>
  )
}

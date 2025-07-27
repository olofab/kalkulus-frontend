'use client'

import {
  Box, Card, CardContent, Container, Typography, Chip, Stack,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { useOffers } from './hooks/useOffers'
import { ArrowRight, Building2, Check, Mail, Pencil, X } from 'lucide-react'
import { off } from 'process'
import { getStatusStyle } from './utils/StatusStyle'
import EmptyState from '../components/common/EmptyState'

export default function OfferListPage() {
  const { data: offers, isLoading, isError } = useOffers()
  const router = useRouter()
  const theme = useTheme();

  if (isLoading) return <Box p={2}>Laster tilbud...</Box>
  if (isError) return <Box p={2}>Kunne ikke laste tilbud</Box>

  const sortedOffers = [...(offers || [])].sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
  )

  if (sortedOffers.length === 0) {
    return (
      <EmptyState
        title="Ingen tilbud enda"
        description="Når du lager et nytt tilbud, vil det vises her."
        imageSrc="/illustrations/empty_state_timla.png"
        actionLabel="Opprett nytt tilbud"
        onActionClick={() => {
          // Navigate or open drawer
        }}
      />
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F7F9F9' }}>
      <Container sx={{ pt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Dine tilbud
        </Typography>

        <Stack spacing={2}>
          {sortedOffers.map((offer) => (
            <Card
              key={offer.id}
              onClick={() => router.push(`/offers/${offer.id}`)}
              sx={{
                p: 2,
                borderRadius: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                '&:hover': {
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    bgcolor: getStatusStyle(offer.status).color,
                    color: 'primary.main',
                    width: 48,
                    height: 48,
                  }}
                >
                  {getStatusStyle(offer.status).icon}
                </Avatar>

                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {offer.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.customer} {offer.address && ` | ${offer.address}`}
                  </Typography>
                  <Stack direction="row" gap={1} alignItems="center" mt={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      {offer.totalSum.toFixed(0)} kr
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              <IconButton edge="end" sx={{ mr: 2 }}>
                <ArrowRight size={18} strokeWidth={2} />
              </IconButton>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

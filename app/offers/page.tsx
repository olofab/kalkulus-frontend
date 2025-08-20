'use client'

import {
  Box, CardContent, Container, Typography, Chip, Stack,
  Avatar,
  IconButton,
  useTheme,
  Skeleton
} from '@mui/material'
import Card from '../design/components/Card'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { useOffers } from './hooks/useOffers'
import { ArrowRight, Building2, Check, Mail, Pencil, X } from 'lucide-react'
import { off } from 'process'
import { getStatusStyle } from './utils/StatusStyle'
import EmptyState from '../components/common/EmptyState'
import NewOfferDrawer from './components/CreateOfferDrawer'
import { useState } from 'react'

export default function OfferListPage() {
  const { data: offers, isLoading, isError } = useOffers()
  const router = useRouter()
  const theme = useTheme();
  const [offerDrawerOpen, setOfferDrawerOpen] = useState(false);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        <Container sx={{ pt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Dine tilbud
          </Typography>
          <Stack>
            {Array.from({ length: 3 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  pl: 0,
                  borderRadius: 2,
                  boxShadow: 0,
                }}
              >
                <Skeleton variant="rounded" width={48} height={48} />
                <Stack spacing={1} flex={1}>
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="50%" height={20} />
                </Stack>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    )
  }
  if (isError) return <Box p={2}>Kunne ikke laste tilbud</Box>

  const sortedOffers = [...(offers || [])].sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
  )

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F7F9F9' }}>
      <Container sx={{ pt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Dine tilbud
        </Typography>
        {sortedOffers.length === 0 ?
          (
            <EmptyState
              title="Ingen tilbud funnet"
              description="Når du lager et nytt tilbud, vil det vises her."
              imageSrc="/illustrations/empty-box.png"
              actionLabel="Opprett nytt tilbud"
              onActionClick={() => {
                setOfferDrawerOpen(true)
              }}
            />
          ) :

          <Stack spacing={2}>
            {sortedOffers.map((offer) => (
              <Card
                elevation={1}
                key={offer.id}
                onClick={() => router.push(`/offers/${offer.id}`)}
                padding="md"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      sx={{
                        bgcolor: getStatusStyle(offer.status).color,
                        color: 'primary.main',
                        width: 48,
                        height: 48,
                      }}
                      variant='rounded'
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
                    </Box>
                  </Box>


                </Box>
              </Card>
            ))}
          </Stack>
        }
        <NewOfferDrawer open={offerDrawerOpen} onClose={() => setOfferDrawerOpen(false)} />
      </Container>
    </Box>
  )
}

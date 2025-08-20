'use client'
import {
  Avatar, Box, Chip, IconButton, Stack, TextField, Typography,
  InputAdornment, Skeleton,
  Grid,
  Alert,
  Link,
  Card
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Offer } from '../types/offer'
import { apiGet } from '../lib/api'
import { User, Bell, Search, Plus } from 'lucide-react'
import { useAppContext } from '../lib/AppContext'
import dayjs from 'dayjs'
import SearchBarWithResults from './components/Search'
import { ClipboardList, PackageSearch, FileSearch, ArrowRight } from 'lucide-react'
import { getStatusStyle } from '../offers/utils/StatusStyle'
import Image from 'next/image'
import NewOfferDrawer from '../offers/components/CreateOfferDrawer'
import TopHeader from '../components/common/TopHeader'
import { Button, tokens } from '../design'
import { Card as DesignCard } from '../design'


const STATUS_LABELS = {
  all: 'Alle',
  DRAFT: 'Utkast',
  PENDING: 'Sendt',
  ACCEPTED: 'Akseptert',
  REJECTED: 'Avslått',
  EXPIRED: 'Utløpt',
  COMPLETED: 'Fullført'
}

export default function DashboardPage() {
  const router = useRouter()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string | null>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const [offerDrawerOpen, setOfferDrawerOpen] = useState(false)


  const featureCards = [
    {
      title: 'Opprett',
      description: 'Lag et nytt tilbud',
      color: 'background.paper',
      icon: (
        <Image
          src="/icons/project.png"
          alt="Opprett prosjekt"
          width={48}
          height={48}
          style={{ objectFit: 'contain' }}
        />
      ),
      onActionClick: () => setOfferDrawerOpen(true)
    },
    {
      title: 'Vareliste',
      description: 'Alle varer og tjenester',
      color: 'background.paper',
      icon: (
        <Image
          src="/icons/items.png"
          alt="Vareliste"
          width={48}
          height={48}
          style={{ objectFit: 'contain' }}
        />
      ),
      onActionClick: () => router.push('/items')
    },
    {
      title: 'Prosjekter',
      description: 'Se og rediger tilbud',
      color: 'background.paper',
      icon: (
        <Image
          src="/icons/offers.png"
          alt="Tilbud"
          width={48}
          height={48}
          style={{ objectFit: 'contain' }}
        />
      ),
      onActionClick: () => router.push('/offers')
    }
  ]

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true)
      try {
        const response = await apiGet('/api/offers')
        setOffers(response)
      } catch (err) {
        console.error('Feil ved henting av tilbud', err)
        setError('Noe gikk galt ved henting av tilbudene.')
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) =>
      (statusFilter === 'all' || offer.status === statusFilter) &&
      offer.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [offers, statusFilter, searchTerm])

  const expiresSoon = offers.filter(offer =>
    dayjs(offer.validUntil).isBefore(dayjs().add(7, 'day'))
  )

  if (true) {
    return (
      <>
        <TopHeader />
        <Box p={3} pt={1}>
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Feature cards in a row */}
          <Grid container spacing={1} mb={4}>
            {featureCards.map((card, index) => (
              <Grid item xs={4} sm={4} key={index}>

                <Box
                  onClick={card.onActionClick}

                  sx={{
                    backgroundColor: card.color,
                    borderRadius: 2,
                    p: 1,
                    pt: 2,
                    boxShadow: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    textAlign: 'center',
                  }}
                >
                  {card.icon}
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <SearchBarWithResults />


          {/* Latest offers list */}
          {offers.length > 0 && (<Typography variant="h5" fontWeight={600} mb={2}>
            Siste tilbud
          </Typography>
          )}

          {offers.length === 0 && (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6}>
              <Image
                src="/icons/empty.png"
                alt="Ingen tilbud"
                width={60}
                height={60}
                style={{ opacity: 0.85, marginBottom: 16 }}
              />
              <Typography variant="h6" color="text.secondary" mb={1}>
                Du har ingen tilbud ennå
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" mb={2}>
                Opprett ditt første tilbud ved å klikke på "Opprett" knappen over.
              </Typography>
            </Box>
          )}
          <Stack spacing={2}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Stack direction="row" spacing={2} key={i}>
                  {/* Square skeleton */}

                  <Skeleton variant="rounded" width={48} height={48} />
                  {/* Two longer skeletons under each other */}
                  <Stack spacing={0.5} flex={1} justifyContent="center">
                    <Skeleton width="60%" height={24} />
                    <Skeleton width="40%" height={20} />
                  </Stack>
                </Stack>
              ))
            ) : (
              [...offers]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 10)
                .map((offer) => (
                  <DesignCard
                    key={offer.id}
                    padding="md"
                    elevation={1}
                    onClick={() => router.push(`/offers/${offer.id}`)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: getStatusStyle(offer.status).color,
                          color: tokens.colors.neutral[700],
                          width: 36,
                          height: 36,
                        }}
                        variant='circular'
                      >
                        {getStatusStyle(offer.status).icon}
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {offer.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {offer.customer} {offer.address && ` | ${offer.address}`}
                        </Typography>
                      </Box>
                    </Box>
                  </DesignCard>
                ))
            )}
          </Stack>
          <NewOfferDrawer open={offerDrawerOpen} onClose={() => setOfferDrawerOpen(false)} />

        </Box>
        <NewOfferDrawer
          open={offerDrawerOpen}
          onClose={() => setOfferDrawerOpen(false)}
        />
      </>
    )
  }
}

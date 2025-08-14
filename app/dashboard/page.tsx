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
import { off } from 'process'


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
        <Stack spacing={1}>
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
                <Card
                  elevation={0}
                  key={offer.id}
                  onClick={() => router.push(`/offers/${offer.id}`)}
                  sx={{
                    p: 1,
                    pl: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
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
                </Card>
              ))
          )}
        </Stack>
        <NewOfferDrawer open={offerDrawerOpen} onClose={() => setOfferDrawerOpen(false)} />

      </Box>
    )
  }

  return (
    <Box p={2}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ bgcolor: 'primary.main', cursor: 'pointer' }}
            onClick={() => router.push('/me')}
          >
            <User />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary">Hello,</Typography>
            <Typography variant="body1" fontWeight={600}>{user?.name}</Typography>
          </Box>
        </Stack>
        <IconButton onClick={() => router.push('/notifications')}>
          <Bell />
        </IconButton>
      </Stack>

      {/* Title */}
      <Typography variant="h5" fontWeight={700} mb={4} mt={4}>
        Timla, tilbud raskt og enkelt
      </Typography>

      {/* Search + Add */}
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <TextField
          placeholder="Søk etter tilbud..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'background.paper',
              height: 40, // match IconButton
              paddingRight: 0,
            }
          }}
          inputProps={{
            sx: {
              height: '100%',
              //padding: '20px 14px' // juster om nødvendig
            }
          }}
        />
        <IconButton
          onClick={() => router.push('/offers/new')}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            width: 40,
            height: 40,
            '&:hover': { bgcolor: 'primary.main' }
          }}
        >
          <Plus />
        </IconButton>
      </Stack>


      {/* Status Filter */}
      <Stack direction="row" spacing={1} mb={2}>
        {Object.entries(STATUS_LABELS).map(([status, label]) => (
          <Chip
            key={status}
            label={label}
            variant={statusFilter === status ? 'filled' : 'outlined'}
            color={statusFilter === status ? 'primary' : 'default'}
            onClick={() => setStatusFilter(statusFilter === status ? null : status)}
          />
        ))}
      </Stack>

      {/* List / Skeletons */}
      <Stack spacing={2}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Box key={i} sx={{ p: 2, borderRadius: 2, backgroundColor: 'background.paper', boxShadow: 1 }}>
              <Skeleton width="60%" height={24} />
              <Skeleton width="40%" height={20} />
              <Skeleton width="30%" height={16} />
            </Box>
          ))
        ) : (
          filteredOffers.map((offer) => (
            <Box
              key={offer.id}
              sx={{ p: 2, borderRadius: 1, backgroundColor: 'background.paper', boxShadow: 0, cursor: 'pointer', border: '1px solid #ddd' }}
              onClick={() => router.push(`/offers/${offer.id}`)}
            >
              <Typography fontWeight={600}>{offer.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {offer.customer}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Status: {STATUS_LABELS[offer.status as keyof typeof STATUS_LABELS]}
              </Typography>
            </Box>
          ))
        )}
      </Stack>


    </Box >
  )
}

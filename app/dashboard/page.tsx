'use client'
import {
  Avatar, Box, Chip, IconButton, Stack, TextField, Typography,
  InputAdornment, Skeleton
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Offer } from '../types/offer'
import { fetchOffers } from '../lib/api'
import PersonIcon from '@mui/icons-material/Person';

const STATUS_LABELS = {
  all: 'Alle',
  draft: 'Utkast',
  sent: 'Sendt',
  accepted: 'Akseptert',
  rejected: 'Avslått'
}

export default function DashboardPage() {
  const router = useRouter()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string | null>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchOffers()
      .then(setOffers)
      .finally(() => setLoading(false))
  }, [])

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) =>
      (statusFilter === 'all' || offer.status === statusFilter) &&
      offer.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [offers, statusFilter, searchTerm])

  return (
    <Box p={2}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ bgcolor: 'primary.main', cursor: 'pointer' }}
            onClick={() => router.push('/me')}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary">Hello,</Typography>
            <Typography variant="body1" fontWeight={600}>Andreas Bergman</Typography>
          </Box>
        </Stack>
        <IconButton onClick={() => router.push('/notifications')}>
          <NotificationsNoneIcon />
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
                <SearchIcon />
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
          <AddIcon />
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

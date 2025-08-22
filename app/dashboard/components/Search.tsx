'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  InputBase,
  Paper,
  Typography,
  Divider,
  List,
  CircularProgress,
  ListItemButton,
  Avatar,
} from '@mui/material'
import { useOfferSearch } from '../hooks/useOfferSearch'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { getStatusStyle } from '../../offers/utils/StatusStyle'

export default function SearchBarWithResults() {
  const [query, setQuery] = useState('')
  const { data: offers = [], isLoading } = useOfferSearch(query)
  const router = useRouter()
  const [showNoResults, setShowNoResults] = useState(false);


  useEffect(() => {
    if (!isLoading && query.length > 0 && offers.length === 0) {
      const timer = setTimeout(() => setShowNoResults(true), 1000);
      return () => clearTimeout(timer);
    }
    setShowNoResults(false);
  }, [isLoading, offers.length, query]);


  return (
    <Box mb={2}>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderRadius: 1,
          backgroundColor: 'background.paper',
          boxShadow: 0
        }}
      >
        <Search size={24} style={{ marginRight: 8 }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Søk etter tilbud, varer, notater..."
          inputProps={{ 'aria-label': 'søk etter alt' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Paper>

      {isLoading && (
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <CircularProgress size={20} />
          <Typography variant="body2">Laster søkeresultater...</Typography>
        </Box>)}

      {!isLoading && offers.length > 0 && (
        <Box mt={1} bgcolor="background.paper" borderRadius={2} boxShadow={0} p={2}>
          <Typography variant="body1" color="text.secondary" mb={1} sx={{ fontWeight: 'bold' }}>
            Tilbud
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {offers.map((offer: any) => (
              <ListItemButton
                key={offer.id}
                onClick={() => router.push(`/offers/${offer.id}`)}
                sx={{
                  p: 1,
                  pl: 0,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: getStatusStyle(offer.status).color,
                      color: 'primary.main',
                      width: 32,
                      height: 32,
                    }}
                    variant='rounded'
                  >
                    {getStatusStyle(offer.status).icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {`${offer.title} • ${offer.customer}`}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
      {showNoResults && (
        <Typography variant="body2" mt={2} color="text.secondary" textAlign={'center'}>
          Ingen resultater funnet
        </Typography>
      )}
    </Box>
  )
}



'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  CircularProgress,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import { ScanSearch, Search } from 'lucide-react'
import { useOfferSearch } from '../hooks/useOfferSearch'
import { useRouter } from 'next/navigation'

export default function SearchBarWithResults() {
  const [query, setQuery] = useState('')
  const { data: offers = [], isLoading } = useOfferSearch(query)
  const theme = useTheme();
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
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 0
        }}
      >
        <ScanSearch size={24} color={theme.palette.primary.main} strokeWidth={2} />
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
        <Box mt={1} bgcolor="background.paper" borderRadius={2} boxShadow={0} p={1}>
          <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
            Tilbud
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {offers.map((offer: any) => (
              <ListItem
                button
                key={offer.id}
                onClick={() => router.push(`/offers/${offer.id}`)}
              >
                <ListItemText
                  primary={offer.title || 'Uten tittel'}
                  secondary={`Kunde: ${offer.customer} • ${offer.totalSumWithVat} kr • ${new Date(offer.createdAt).toLocaleDateString()}`}
                />
              </ListItem>
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



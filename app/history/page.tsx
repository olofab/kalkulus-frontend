'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Alert,
  useTheme
} from '@mui/material'
import { ArrowLeft, Clock } from 'lucide-react'
import { useOfferHistory } from './hooks/useOfferHistory'
import LoadingScreen from '../components/LoadingScreen'
import EventList from './components/EventList'
import EventDetailsDrawer from './components/EventDetailsDrawer'
import { HistoryEvent } from '../types/history'

export default function HistoryPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const theme = useTheme()
  
  const offerId = searchParams.get('offerId')
  const { history, loading, error, refetch } = useOfferHistory(offerId)
  
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null)
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false)

  const handleEventClick = (event: HistoryEvent) => {
    setSelectedEvent(event)
    setDetailsDrawerOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailsDrawerOpen(false)
    setSelectedEvent(null)
  }

  if (loading) return <LoadingScreen />

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Kunne ikke laste historikk: {error.message}
        </Alert>
      </Box>
    )
  }

  if (!offerId) {
    return (
      <Box p={3}>
        <Alert severity="warning">
          Ingen tilbud ID oppgitt. Vennligst gå tilbake og prøv igjen.
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper'
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton 
            onClick={() => router.back()}
            size="small"
          >
            <ArrowLeft size={20} />
          </IconButton>
          
          <Clock size={24} color={theme.palette.primary.main} />
          
          <Box flex={1}>
            <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
              Historikk
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tilbud #{offerId}
            </Typography>
          </Box>

          {history && (
            <Chip
              label={`${history.totalEvents} hendelser`}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </Paper>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {history ? (
          <EventList 
            events={history.events} 
            loading={loading}
            onEventClick={handleEventClick}
          />
        ) : (
          <Typography>Ingen historikk tilgjengelig</Typography>
        )}
      </Box>

      {/* Event Details Drawer */}
      <EventDetailsDrawer
        open={detailsDrawerOpen}
        onClose={handleCloseDetails}
        event={selectedEvent}
      />
    </Box>
  )
}

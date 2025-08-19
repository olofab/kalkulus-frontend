'use client'

import { Box, Typography, Paper } from '@mui/material'
import { HistoryEvent } from '../../types/history'
import EventItem from './EventItem'
import { FileX } from 'lucide-react'

interface EventListProps {
  events: HistoryEvent[]
  loading?: boolean
  onEventClick?: (event: HistoryEvent) => void
}

export default function EventList({ events, loading = false, onEventClick }: EventListProps) {
  if (loading) {
    return (
      <Box p={3}>
        <Typography>Laster historikk...</Typography>
      </Box>
    )
  }

  if (!events || events.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: 'background.default',
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <FileX size={48} style={{ opacity: 0.5, marginBottom: 16 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Ingen historikk funnet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Det har ikke skjedd noen hendelser på dette tilbudet ennå.
        </Typography>
      </Paper>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Hendelser ({events.length})
      </Typography>

      <Box>
        {events.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            isLast={index === events.length - 1}
            onClick={onEventClick}
          />
        ))}
      </Box>
    </Box>
  )
}

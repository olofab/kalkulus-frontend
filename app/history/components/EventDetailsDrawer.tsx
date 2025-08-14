'use client'

import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { X } from 'lucide-react'
import { HistoryEvent } from '../../types/history'
import { getEventIcon, getEventColor, formatEventDescription } from '../utils/eventUtils'
import { formatDate } from '../../lib/formatDate'

interface EventDetailsDrawerProps {
  open: boolean
  onClose: () => void
  event: HistoryEvent | null
}

export default function EventDetailsDrawer({ 
  open, 
  onClose, 
  event 
}: EventDetailsDrawerProps) {
  if (!event) return null

  const IconComponent = getEventIcon(event.type)
  const eventColor = getEventColor(event.type)

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Hendelse detaljer</Typography>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Event Icon and Type */}
        <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: `${eventColor}.main`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconComponent size={24} />
            </Box>
            <Box>
              <Typography variant="h6">
                {formatEventDescription(event)}
              </Typography>
              <Chip
                label={event.type.replace('_', ' ')}
                color={eventColor as any}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Paper>

        {/* Event Details */}
        <List>
          <ListItem>
            <ListItemText
              primary="Tidspunkt"
              secondary={formatDate(event.timestamp)}
            />
          </ListItem>

          {event.userName && (
            <ListItem>
              <ListItemText
                primary="Utført av"
                secondary={event.userName}
              />
            </ListItem>
          )}

          <ListItem>
            <ListItemText
              primary="Event ID"
              secondary={event.id}
            />
          </ListItem>

          {event.description && (
            <ListItem>
              <ListItemText
                primary="Beskrivelse"
                secondary={event.description}
              />
            </ListItem>
          )}
        </List>

        {/* Metadata */}
        {event.metadata && Object.keys(event.metadata).length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Metadata
            </Typography>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              {Object.entries(event.metadata).map(([key, value]) => (
                <Box key={key} display="flex" justifyContent="space-between" py={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    {key}:
                  </Typography>
                  <Typography variant="body2">
                    {String(value)}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </>
        )}
      </Box>
    </Drawer>
  )
}

'use client'

import { Box, Paper, Typography, Chip, Avatar, useTheme } from '@mui/material'
import { HistoryEvent } from '../../types/history'
import { getEventIcon, getEventColor, formatEventDescription } from '../utils/eventUtils'
import { formatDate } from '../../lib/formatDate'

interface EventItemProps {
  event: HistoryEvent
  isLast?: boolean
  onClick?: (event: HistoryEvent) => void
}

export default function EventItem({ event, isLast = false, onClick }: EventItemProps) {
  const theme = useTheme()
  const IconComponent = getEventIcon(event.type)
  const eventColor = getEventColor(event.type)

  return (
    <Box 
      display="flex" 
      position="relative"
      sx={{
        '&:not(:last-child)::after': !isLast ? {
          content: '""',
          position: 'absolute',
          left: '20px',
          top: '50px',
          bottom: '-20px',
          width: '2px',
          backgroundColor: theme.palette.divider,
        } : {}
      }}
    >
      {/* Timeline dot with icon */}
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: `${eventColor}.main`,
          color: 'white',
          mr: 2,
          zIndex: 1,
        }}
      >
        <IconComponent size={20} />
      </Avatar>

      {/* Event content */}
      <Box flex={1} pb={3}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            cursor: onClick ? 'pointer' : 'default',
            transition: 'all 0.2s ease-in-out',
            '&:hover': onClick ? {
              elevation: 2,
              transform: 'translateY(-1px)',
              borderColor: theme.palette.primary.main,
            } : {}
          }}
          onClick={() => onClick?.(event)}
        >
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Typography variant="body1" fontWeight="medium">
              {formatEventDescription(event)}
            </Typography>
            <Chip
              label={event.type.replace('_', ' ')}
              color={eventColor as any}
              size="small"
              variant="outlined"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" mb={1}>
            {formatDate(event.timestamp)}
          </Typography>

          {event.userName && (
            <Typography variant="caption" color="text.secondary">
              Av: {event.userName}
            </Typography>
          )}

          {/* Metadata display */}
          {event.metadata && Object.keys(event.metadata).length > 0 && (
            <Box mt={1}>
              {event.metadata.previousValue && event.metadata.newValue && (
                <Typography variant="caption" display="block" color="text.secondary">
                  {event.metadata.previousValue} → {event.metadata.newValue}
                </Typography>
              )}
              {event.metadata.itemName && (
                <Typography variant="caption" display="block" color="text.secondary">
                  Vare: {event.metadata.itemName}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

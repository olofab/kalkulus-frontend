/**
 * Minimalistic StatCard component for KPI display
 * Clean design with refined spacing and typography
 */

import React from 'react'
import { Box, Typography, LinearProgress, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'
import Card from './Card'

export interface StatCardProps {
  /** Icon element */
  icon: React.ReactNode
  /** Card title */
  title: string
  /** Display value */
  value: string | number
  /** Optional progress percentage (0-100) */
  progress?: number
  /** Accent color for icon background */
  accentColor?: string
  /** Click handler */
  onClick?: () => void
}

const IconContainer = styled(Box)<{
  accentcolor?: string
}>(({ theme, accentcolor }) => {
  const { tokens } = theme
  const bgColor = accentcolor || tokens.colors.primary[500]

  return {
    width: 36,
    height: 36,
    borderRadius: tokens.radius.md,
    backgroundColor: alpha(bgColor, 0.1),
    color: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
    transition: tokens.transitions.normal,
  }
})

const StyledLinearProgress = styled(LinearProgress)<{
  accentcolor?: string
}>(({ theme, accentcolor }) => {
  const { tokens } = theme
  const barColor = accentcolor || tokens.colors.primary[500]

  return {
    height: 3,
    borderRadius: tokens.radius.round,
    backgroundColor: tokens.surface.secondary,
    '& .MuiLinearProgress-bar': {
      backgroundColor: barColor,
      borderRadius: tokens.radius.round,
    },
  }
})

/**
 * Minimalistic StatCard component for displaying KPI metrics
 */
export default function StatCard({
  icon,
  title,
  value,
  progress,
  accentColor,
  onClick,
}: StatCardProps) {
  const isClickable = !!onClick

  return (
    <Card
      padding="md"
      onClick={onClick}
      sx={{
        cursor: isClickable ? 'pointer' : 'default',
        '&:hover': isClickable ? {
          transform: 'translateY(-2px)',
          '& .icon-container': {
            transform: 'scale(1.05)',
          },
        } : {},
      }}
    >
      <Box display="flex" alignItems="flex-start" gap={1.5} mb={progress ? 2 : 0}>
        <IconContainer
          accentcolor={accentColor}
          className="icon-container"
        >
          {icon}
        </IconContainer>

        <Box flex={1} minWidth={0}>
          <Typography
            variant="caption"
            sx={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              lineHeight: 1.2,
              color: 'text.secondary',
              opacity: 0.8,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: '1.375rem',
              lineHeight: 1.2,
              mt: 0.25,
              color: 'text.primary',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>

      {progress !== undefined && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.75}>
            <Typography
              variant="caption"
              sx={{
                fontSize: 11,
                color: 'text.secondary',
                opacity: 0.8,
              }}
            >
              Fremdrift
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              {progress}%
            </Typography>
          </Box>
          <StyledLinearProgress
            variant="determinate"
            value={progress}
            accentcolor={accentColor}
          />
        </Box>
      )}
    </Card>
  )
}

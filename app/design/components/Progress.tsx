/**
 * Progress component with linear and circular variants
 * Features rounded ends and smooth animations
 */

import React from 'react'
import { Box, LinearProgress, CircularProgress, Typography, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface ProgressProps {
  /** Progress variant */
  variant?: 'linear' | 'circular'
  /** Progress value (0-100) */
  value?: number
  /** Show progress text */
  showValue?: boolean
  /** Progress size */
  size?: 'sm' | 'md' | 'lg'
  /** Color variant */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | string
  /** Linear progress height */
  thickness?: number
}

const StyledLinearProgress = styled(LinearProgress)<{
  customcolor?: string
  thickness?: number
}>(({ theme, customcolor, thickness = 6 }) => {
  const { tokens } = theme

  // Map color names to actual color values
  const getColor = (color?: string) => {
    if (!color) return theme.palette.primary.main

    switch (color) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      case 'success':
        return '#10B981'
      case 'warning':
        return '#F59E0B'
      case 'error':
        return '#EF4444'
      default:
        return color
    }
  }

  const progressColor = getColor(customcolor)

  return {
    height: thickness,
    borderRadius: tokens.radius.round,
    backgroundColor: alpha(progressColor, 0.1),
    '& .MuiLinearProgress-bar': {
      backgroundColor: progressColor,
      borderRadius: tokens.radius.round,
    },
  }
})

const StyledCircularProgress = styled(CircularProgress)<{
  customcolor?: string
}>(({ theme, customcolor }) => {
  // Map color names to actual color values
  const getColor = (color?: string) => {
    if (!color) return theme.palette.primary.main

    switch (color) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      case 'success':
        return '#10B981'
      case 'warning':
        return '#F59E0B'
      case 'error':
        return '#EF4444'
      default:
        return color
    }
  }

  const progressColor = getColor(customcolor)

  return {
    color: progressColor,
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round',
    },
  }
})

/**
 * Progress component with linear and circular variants
 */
export default function Progress({
  variant = 'linear',
  value,
  showValue = false,
  size = 'md',
  color,
  thickness,
}: ProgressProps) {
  const sizeMap = {
    sm: { linear: 4, circular: 32 },
    md: { linear: 6, circular: 40 },
    lg: { linear: 8, circular: 48 },
  }

  const actualThickness = thickness || sizeMap[size].linear
  const circularSize = sizeMap[size].circular

  if (variant === 'circular') {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCircularProgress
          variant={value !== undefined ? 'determinate' : 'indeterminate'}
          value={value}
          size={circularSize}
          thickness={6}
          customcolor={color}
        />
        {showValue && value !== undefined && (
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: size === 'lg' ? '14px' : '12px',
                color: 'text.secondary',
              }}
            >
              {`${Math.round(value)}%`}
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <StyledLinearProgress
        variant={value !== undefined ? 'determinate' : 'indeterminate'}
        value={value}
        customcolor={color}
        thickness={actualThickness}
      />
      {showValue && value !== undefined && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              color: 'text.secondary',
            }}
          >
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

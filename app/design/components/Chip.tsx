/**
 * Minimalistic Chip component with clean design
 * Mobile-friendly with refined aesthetics
 */

import React from 'react'
import { Chip as MuiChip, ChipProps as MuiChipProps, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface ChipProps extends Omit<MuiChipProps, 'variant' | 'color'> {
  /** Chip variant */
  variant?: 'soft' | 'outline'
  /** Severity mapping */
  severity?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
}

const StyledChip = styled(MuiChip)<{
  customvariant?: ChipProps['variant']
  customseverity?: ChipProps['severity']
}>(({ theme, customvariant = 'soft', customseverity = 'neutral' }) => {
  const { tokens } = theme

  // Severity color mapping using new design tokens
  const severityColors = {
    info: tokens.colors.primary[500],
    success: tokens.colors.success[500],
    warning: tokens.colors.warning[500],
    error: tokens.colors.error[500],
    neutral: tokens.colors.secondary[500],
  }

  const severityColor = severityColors[customseverity]

  let variantStyles = {}
  if (customvariant === 'soft') {
    variantStyles = {
      backgroundColor: alpha(severityColor, 0.1),
      color: severityColor,
      border: 'none',
      '&:hover': {
        backgroundColor: alpha(severityColor, 0.15),
        transform: 'scale(1.02)',
      },
      '&:focus': {
        backgroundColor: alpha(severityColor, 0.15),
        outline: `2px solid ${alpha(severityColor, 0.3)}`,
        outlineOffset: 1,
      },
    }
  } else if (customvariant === 'outline') {
    variantStyles = {
      backgroundColor: tokens.surface.primary,
      color: severityColor,
      border: `1px solid ${alpha(severityColor, 0.3)}`,
      '&:hover': {
        backgroundColor: alpha(severityColor, 0.05),
        borderColor: severityColor,
        transform: 'scale(1.02)',
      },
      '&:focus': {
        backgroundColor: alpha(severityColor, 0.05),
        outline: `2px solid ${alpha(severityColor, 0.3)}`,
        outlineOffset: 1,
      },
    }
  }

  return {
    borderRadius: tokens.radius.round,
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: tokens.typography.fontWeight.medium,
    height: 'auto',
    padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`,
    transition: tokens.transitions.normal,
    '& .MuiChip-label': {
      padding: 0,
      lineHeight: 1.4,
    },
    '& .MuiChip-deleteIcon': {
      fontSize: '14px',
      marginLeft: tokens.spacing.xs,
      marginRight: -2,
      '&:hover': {
        color: tokens.colors.error[600],
      },
    },
    ...variantStyles,
  }
})

/**
 * Minimalistic Chip component with clean design
 */
export default function Chip({
  variant = 'soft',
  severity = 'neutral',
  ...props
}: ChipProps) {
  return (
    <StyledChip
      customvariant={variant}
      customseverity={severity}
      {...props}
    />
  )
}

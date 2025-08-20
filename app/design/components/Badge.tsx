/**
 * Enhanced Badge component with design system styling
 * Supports severity mapping and dot variant
 */

import React from 'react'
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface BadgeProps extends Omit<MuiBadgeProps, 'color'> {
  /** Severity mapping */
  severity?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

const StyledBadge = styled(MuiBadge)<{
  customseverity?: BadgeProps['severity']
}>(({ theme, customseverity = 'primary' }) => {
  const { tokens } = theme

  // Severity color mapping
  const severityColors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  }

  const severityColor = severityColors[customseverity]

  return {
    '& .MuiBadge-badge': {
      backgroundColor: severityColor,
      color: 'white',
      fontSize: tokens.typography.fontSize.xs,
      fontWeight: tokens.typography.fontWeight.medium,
      minWidth: 18,
      height: 18,
      borderRadius: tokens.radius.round,
      padding: '0 4px',
      border: `2px solid ${theme.palette.background.paper}`,
      '&.MuiBadge-dot': {
        minWidth: 8,
        height: 8,
        borderRadius: '50%',
        padding: 0,
      },
    },
  }
})

/**
 * Badge component with design system severity mapping
 */
export default function Badge({
  severity = 'primary',
  children,
  ...props
}: BadgeProps) {
  return (
    <StyledBadge
      customseverity={severity}
      {...props}
    >
      {children}
    </StyledBadge>
  )
}

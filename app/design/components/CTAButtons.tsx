/**
 * CTAButtons component for stacked primary and secondary action buttons
 * Features full-width buttons with large size and rounded corners
 */

import React from 'react'
import { Stack } from '@mui/material'
import Button from './Button'

export interface CTAButtonsProps {
  /** Primary action configuration */
  primary?: {
    label: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
  }
  /** Secondary action configuration */
  secondary?: {
    label: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
  }
  /** Stack direction */
  direction?: 'column' | 'row'
  /** Spacing between buttons */
  spacing?: number
}

/**
 * CTAButtons component for primary and secondary call-to-action buttons
 */
export default function CTAButtons({
  primary,
  secondary,
  direction = 'column',
  spacing = 2,
}: CTAButtonsProps) {
  if (!primary && !secondary) {
    return null
  }

  return (
    <Stack
      direction={direction}
      spacing={spacing}
      sx={{
        width: '100%',
        alignItems: 'stretch',
      }}
    >
      {primary && (
        <Button
          variant="primary"
          size="lg"
          onClick={primary.onClick}
          disabled={primary.disabled || primary.loading}
          fullWidth
          sx={{
            minHeight: 48,
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {primary.loading ? 'Laster...' : primary.label}
        </Button>
      )}

      {secondary && (
        <Button
          variant="secondary"
          size="lg"
          onClick={secondary.onClick}
          disabled={secondary.disabled || secondary.loading}
          fullWidth
          sx={{
            minHeight: 48,
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {secondary.loading ? 'Laster...' : secondary.label}
        </Button>
      )}
    </Stack>
  )
}

/**
 * EmptyState component for displaying empty states with illustrations
 * Supports title, description, illustration, and CTA buttons
 */

import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import Button from './Button'

export interface EmptyStateProps {
  /** Illustration element or image src */
  illustration?: React.ReactNode | string
  /** Main title */
  title: string
  /** Description text */
  description?: string
  /** Primary action button */
  primaryAction?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  /** Secondary action button */
  secondaryAction?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  /** Maximum width */
  maxWidth?: number
}

/**
 * EmptyState component for user-friendly empty states
 */
export default function EmptyState({
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction,
  maxWidth = 400,
}: EmptyStateProps) {
  const renderIllustration = () => {
    if (!illustration) return null

    if (typeof illustration === 'string') {
      return (
        <Box
          component="img"
          src={illustration}
          alt=""
          sx={{
            width: 160,
            height: 160,
            objectFit: 'contain',
            mb: 3,
          }}
        />
      )
    }

    return (
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        {illustration}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 4,
        maxWidth,
        margin: '0 auto',
      }}
    >
      {renderIllustration()}

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '18px',
          color: 'text.primary',
          mb: description ? 1 : 3,
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5,
            mb: 3,
            maxWidth: 320,
          }}
        >
          {description}
        </Typography>
      )}

      {(primaryAction || secondaryAction) && (
        <Stack direction="column" spacing={2} sx={{ width: '100%', maxWidth: 280 }}>
          {primaryAction && (
            <Button
              variant="primary"
              size="md"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              fullWidth
            >
              {primaryAction.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              variant="secondary"
              size="md"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
              fullWidth
            >
              {secondaryAction.label}
            </Button>
          )}
        </Stack>
      )}
    </Box>
  )
}

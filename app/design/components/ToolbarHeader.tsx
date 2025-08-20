/**
 * ToolbarHeader component for mobile-first navigation
 * Features back button, title, and actions with blur/elevation options
 */

import React from 'react'
import { Box, Typography, IconButton, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChevronLeft, MoreVertical } from '../icons'

export interface ToolbarHeaderProps {
  /** Header title */
  title?: string
  /** Show back button */
  showBack?: boolean
  /** Back button click handler */
  onBack?: () => void
  /** Back button aria label */
  backAriaLabel?: string
  /** Actions slot (usually IconButton or menu) */
  actions?: React.ReactNode
  /** Apply blur background */
  blur?: boolean
  /** Apply elevated shadow */
  elevated?: boolean
  /** Left-align title when no back button */
  leftAlignTitle?: boolean
}

const ToolbarContainer = styled(Box)<{
  blur?: boolean
  elevated?: boolean
}>(({ theme, blur, elevated }) => {
  const { tokens } = theme

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    padding: `0 ${tokens.spacing.lg}px`,
    backgroundColor: blur
      ? alpha(theme.palette.background.default, 0.9)
      : 'transparent',
    backdropFilter: blur ? 'blur(8px)' : 'none',
    borderBottom: blur || elevated
      ? `1px solid ${alpha(theme.palette.grey[300], 0.2)}`
      : 'none',
    boxShadow: elevated ? tokens.elevation[1] : 'none',
    position: 'relative',
    zIndex: theme.zIndex.appBar,
  }
})

const TitleContainer = styled(Box)<{
  centered?: boolean
}>(({ centered }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: centered ? 'center' : 'flex-start',
  minWidth: 0, // Allow text truncation
}))

const ActionsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginLeft: 'auto',
}))

/**
 * ToolbarHeader component for consistent mobile navigation
 */
export default function ToolbarHeader({
  title,
  showBack = false,
  onBack,
  backAriaLabel = 'Gå tilbake',
  actions,
  blur = false,
  elevated = false,
  leftAlignTitle = false,
}: ToolbarHeaderProps) {
  const shouldCenterTitle = showBack && !leftAlignTitle

  return (
    <ToolbarContainer blur={blur} elevated={elevated}>
      {/* Back button */}
      {showBack && (
        <IconButton
          onClick={onBack}
          aria-label={backAriaLabel}
          sx={{
            marginRight: 1,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ChevronLeft size={24} />
        </IconButton>
      )}

      {/* Title */}
      <TitleContainer centered={shouldCenterTitle}>
        {title && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: shouldCenterTitle ? 'center' : 'left',
            }}
          >
            {title}
          </Typography>
        )}
      </TitleContainer>

      {/* Actions */}
      {actions && (
        <ActionsContainer>
          {actions}
        </ActionsContainer>
      )}
    </ToolbarContainer>
  )
}

/**
 * Enhanced Drawer component with bottom sheet and side drawer variants
 * Features grabber for bottom sheets and smooth transitions
 */

import React from 'react'
import { Drawer as MuiDrawer, DrawerProps as MuiDrawerProps, Box, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface DrawerProps extends Omit<MuiDrawerProps, 'variant'> {
  /** Drawer variant */
  variant?: 'bottom' | 'side'
  /** Show grabber for bottom sheet */
  showGrabber?: boolean
  /** Grabber aria label */
  grabberAriaLabel?: string
}

const StyledDrawer = styled(MuiDrawer)<{
  customvariant?: DrawerProps['variant']
}>(({ theme, customvariant = 'side' }) => {
  const { tokens } = theme

  const bottomSheetStyles = customvariant === 'bottom' ? {
    '& .MuiDrawer-paper': {
      borderTopLeftRadius: `${tokens.radius.xl}px !important`,
      borderTopRightRadius: `${tokens.radius.xl}px !important`,
      maxHeight: '90vh',
      backgroundColor: tokens.surface.primary,
      border: `1px solid ${tokens.surface.border}`,
      borderBottom: 'none',
      backdropFilter: 'blur(8px)',
    },
  } : {}

  return {
    '& .MuiDrawer-paper': {
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
      borderRadius: customvariant === 'side' ? 0 : undefined,
    },
    ...bottomSheetStyles,
  }
})

const GrabberContainer = styled(Box)(({ theme }) => {
  const { tokens } = theme

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    padding: `${tokens.spacing.md}px 0`,
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing',
    },
  }
})

const GrabberHandle = styled(Box)(({ theme }) => {
  const { tokens } = theme

  return {
    width: 36,
    height: 4,
    backgroundColor: alpha(theme.palette.grey[500], 0.3),
    borderRadius: tokens.radius.round,
    transition: tokens.transitions.fast,
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[500], 0.5),
    },
  }
})

/**
 * Drawer component with bottom sheet and side variants
 */
export default function Drawer({
  variant = 'side',
  showGrabber = true,
  grabberAriaLabel = 'Dra for å lukke',
  children,
  onClose,
  ...props
}: DrawerProps) {
  const isBottomSheet = variant === 'bottom'

  const handleGrabberClick = () => {
    if (onClose) {
      onClose({}, 'backdropClick')
    }
  }

  return (
    <StyledDrawer
      customvariant={variant}
      anchor={isBottomSheet ? 'bottom' : 'left'}
      onClose={onClose}
      {...props}
    >
      {isBottomSheet && showGrabber && (
        <GrabberContainer
          onClick={handleGrabberClick}
          role="button"
          aria-label={grabberAriaLabel}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleGrabberClick()
            }
          }}
        >
          <GrabberHandle />
        </GrabberContainer>
      )}

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </StyledDrawer>
  )
}

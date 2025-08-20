/**
 * Minimalistic Button component with modern design
 * Mobile-friendly with refined aesthetics
 */

import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps, alpha, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'accent'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Start icon */
  startIcon?: React.ReactNode
  /** End icon */
  endIcon?: React.ReactNode
}

const StyledButton = styled(MuiButton)<{
  customvariant?: ButtonProps['variant']
  customsize?: ButtonProps['size']
}>(({ theme, customvariant = 'primary', customsize = 'md' }) => {
  const { tokens } = theme

  // Base styles
  const baseStyles = {
    borderRadius: tokens.radius.md,
    fontWeight: tokens.typography.fontWeight.medium,
    textTransform: 'none' as const,
    transition: tokens.transitions.normal,
    cursor: 'pointer',
    outline: 'none',
    position: 'relative' as const,
    overflow: 'hidden',

    '&:disabled': {
      backgroundColor: tokens.surface.tertiary,
      color: tokens.colors.neutral[400],
      border: 'none',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },

    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.primary[500]}`,
      outlineOffset: 2,
    },

    // Subtle ripple effect
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle, transparent 1%, rgba(255,255,255,0.2) 1%)',
      transform: 'scale(10, 10)',
      opacity: 0,
      transition: 'transform 0.5s, opacity 1s',
    },

    '&:active::after': {
      transform: 'scale(0, 0)',
      opacity: 1,
      transition: '0s',
    },
  }

  // Size-specific styles
  let sizeStyles = {}
  if (customsize === 'sm') {
    sizeStyles = {
      height: tokens.components.button.height.sm,
      padding: tokens.components.button.padding.sm,
      fontSize: tokens.typography.fontSize.xs,
    }
  } else if (customsize === 'lg') {
    sizeStyles = {
      height: tokens.components.button.height.lg,
      padding: tokens.components.button.padding.lg,
      fontSize: tokens.typography.fontSize.base,
    }
  } else {
    sizeStyles = {
      height: tokens.components.button.height.md,
      padding: tokens.components.button.padding.md,
      fontSize: tokens.typography.fontSize.sm,
    }
  }

  // Variant-specific styles
  let variantStyles = {}
  if (customvariant === 'primary') {
    variantStyles = {
      backgroundColor: tokens.colors.primary[500], // #3929b0
      color: '#FFFFFF',
      border: 'none',
      boxShadow: tokens.elevation[1],
      '&:hover': {
        backgroundColor: tokens.colors.primary[600],
        boxShadow: tokens.elevation[2],
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: tokens.colors.primary[700],
        transform: 'translateY(0)',
      },
    }
  } else if (customvariant === 'secondary') {
    variantStyles = {
      backgroundColor: tokens.surface.primary,
      color: tokens.colors.active, // #131313
      border: `1px solid ${tokens.surface.border}`,
      boxShadow: tokens.elevation[1],
      '&:hover': {
        backgroundColor: tokens.surface.secondary,
        borderColor: tokens.colors.neutral[300],
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: tokens.surface.tertiary,
        transform: 'translateY(0)',
      },
    }
  } else if (customvariant === 'soft') {
    variantStyles = {
      backgroundColor: alpha(tokens.colors.primary[500], 0.08),
      color: tokens.colors.primary[600],
      border: 'none',
      '&:hover': {
        backgroundColor: alpha(tokens.colors.primary[500], 0.12),
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: alpha(tokens.colors.primary[500], 0.16),
        transform: 'translateY(0)',
      },
    }
  } else if (customvariant === 'ghost') {
    variantStyles = {
      backgroundColor: 'transparent',
      color: tokens.colors.neutral[700],
      border: 'none',
      '&:hover': {
        backgroundColor: alpha(tokens.colors.neutral[500], 0.08),
        color: tokens.colors.active,
      },
      '&:active': {
        backgroundColor: alpha(tokens.colors.neutral[500], 0.12),
      },
    }
  } else if (customvariant === 'accent') {
    variantStyles = {
      backgroundColor: tokens.colors.secondary[500], // #ff4f62
      color: '#FFFFFF',
      border: 'none',
      boxShadow: tokens.elevation[1],
      '&:hover': {
        backgroundColor: tokens.colors.secondary[600],
        boxShadow: tokens.elevation[2],
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: tokens.colors.secondary[700],
        transform: 'translateY(0)',
      },
    }
  }

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
  }
})

/**
 * Minimalistic Button component with refined design
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      customvariant={variant}
      customsize={size}
      startIcon={startIcon}
      endIcon={endIcon}
      disableRipple
      {...props}
    >
      {children}
    </StyledButton>
  )
}

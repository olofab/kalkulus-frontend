/**
 * Enhanced IconButton component with design system styling
 * 40x40 and 48x48 sizes with soft background variants
 */

import React from 'react'
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'size'> {
  /** Button size */
  size?: 'sm' | 'md'
  /** Color variant */
  color?: 'primary' | 'secondary' | 'default'
  /** Soft background variant */
  soft?: boolean
}

const StyledIconButton = styled(MuiIconButton)<{
  customsize?: IconButtonProps['size']
  customsoft?: boolean
}>(({ theme, customsize = 'sm', customsoft = false, color = 'default' }) => {
  const { tokens } = theme

  const sizeValue = customsize === 'md' ? 48 : 40

  let colorStyles = {}
  if (customsoft && color === 'primary') {
    colorStyles = {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
      },
    }
  } else if (customsoft && color === 'secondary') {
    colorStyles = {
      backgroundColor: alpha(theme.palette.secondary.main, 0.08),
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.12),
      },
    }
  }

  return {
    width: sizeValue,
    height: sizeValue,
    borderRadius: '50%',
    transition: tokens.transitions.fast,
    '&:focus-visible': {
      outline: `2px solid ${alpha(theme.palette.primary.main, 0.35)}`,
      outlineOffset: '2px',
    },
    ...colorStyles,
  }
})

/**
 * IconButton component with design system sizes and soft variants
 */
export default function IconButton({
  size = 'sm',
  soft = false,
  children,
  ...props
}: IconButtonProps) {
  return (
    <StyledIconButton
      customsize={size}
      customsoft={soft}
      {...props}
    >
      {children}
    </StyledIconButton>
  )
}

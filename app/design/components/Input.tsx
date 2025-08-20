/**
 * Minimalistic Input component with clean design
 * Mobile-friendly with refined aesthetics
 */

import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface InputProps extends Omit<TextFieldProps, 'size'> {
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
}

const StyledTextField = styled(TextField)<{
  customsize?: InputProps['size']
}>(({ theme, customsize = 'md' }) => {
  const { tokens } = theme

  const sizeStyles = {
    sm: {
      '& .MuiInputBase-root': {
        fontSize: tokens.typography.fontSize.sm,
        height: 36,
      },
      '& .MuiInputBase-input': {
        padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
      },
    },
    md: {
      '& .MuiInputBase-root': {
        fontSize: tokens.typography.fontSize.base,
        height: tokens.components.input.height,
      },
      '& .MuiInputBase-input': {
        padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`,
      },
    },
    lg: {
      '& .MuiInputBase-root': {
        fontSize: tokens.typography.fontSize.lg,
        height: 52,
      },
      '& .MuiInputBase-input': {
        padding: `${tokens.spacing.lg}px ${tokens.spacing.xl}px`,
      },
    },
  }

  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: tokens.radius.md,
      transition: tokens.transitions.normal,
      backgroundColor: tokens.surface.primary,
      '& fieldset': {
        borderColor: tokens.surface.border,
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: tokens.colors.neutral[400],
      },
      '&.Mui-focused fieldset': {
        borderColor: tokens.colors.primary[500],
        borderWidth: '2px',
        boxShadow: `0 0 0 3px ${tokens.colors.primary[100]}`,
      },
      '&.Mui-error fieldset': {
        borderColor: tokens.colors.error[500],
      },
      '&.Mui-error.Mui-focused fieldset': {
        boxShadow: `0 0 0 3px ${tokens.colors.error[100]}`,
      },
      '&.Mui-disabled': {
        backgroundColor: tokens.surface.tertiary,
        '& fieldset': {
          borderColor: tokens.colors.neutral[200],
        },
      },
    },
    '& .MuiFormLabel-root': {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.neutral[600],
      '&.Mui-focused': {
        color: tokens.colors.primary[500],
      },
      '&.Mui-error': {
        color: tokens.colors.error[600],
      },
    },
    '& .MuiFormHelperText-root': {
      fontSize: tokens.typography.fontSize.xs,
      marginLeft: 4,
      marginTop: 6,
      color: tokens.colors.neutral[500],
      '&.Mui-error': {
        color: tokens.colors.error[500],
      },
    },
    '& .MuiInputBase-input': {
      color: tokens.colors.neutral[800],
      '&::placeholder': {
        color: tokens.colors.neutral[400],
        opacity: 1,
      },
    },
    ...sizeStyles[customsize],
  }
})

/**
 * Minimalistic Input component with clean design
 */
export default function Input({
  size = 'md',
  ...props
}: InputProps) {
  return (
    <StyledTextField
      customsize={size}
      variant="outlined"
      {...props}
    />
  )
}

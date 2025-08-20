/**
 * Minimalistic Card component with clean design
 * Mobile-friendly with refined aesthetics
 */

import React from 'react'
import { Paper, PaperProps, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface CardProps extends Omit<PaperProps, 'elevation'> {
  /** Card elevation level */
  elevation?: 1 | 2 | 3
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg'
  /** Header content */
  header?: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
  /** Main content */
  children?: React.ReactNode
}

const StyledCard = styled(Paper)<{
  custompadding?: CardProps['padding']
}>(({ theme, custompadding = 'md' }) => {
  const { tokens } = theme

  return {
    borderRadius: tokens.radius.lg,
    backgroundColor: tokens.surface.primary,
    border: `1px solid ${tokens.surface.border}`,
    transition: tokens.transitions.normal,
    overflow: 'hidden',
    position: 'relative',

    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.elevation[2],
      borderColor: tokens.colors.primary[300],
    },
    '&:active': {
      borderColor: tokens.colors.primary[500],
    },
  }
})

const CardContent = styled(Box)<{
  custompadding?: CardProps['padding']
}>(({ theme, custompadding = 'md' }) => {
  const { tokens } = theme

  const paddingMap = {
    sm: tokens.spacing.md,
    md: tokens.spacing.lg,
    lg: tokens.spacing.xl,
  }

  return {
    padding: paddingMap[custompadding],
  }
})

const CardHeader = styled(Box)<{
  custompadding?: CardProps['padding']
}>(({ theme, custompadding = 'md' }) => {
  const { tokens } = theme

  const paddingMap = {
    sm: tokens.spacing.md,
    md: tokens.spacing.lg,
    lg: tokens.spacing.xl,
  }

  return {
    padding: `${paddingMap[custompadding]}px ${paddingMap[custompadding]}px 0`,
    borderBottom: `1px solid ${tokens.surface.border}`,
    marginBottom: paddingMap[custompadding],
    color: tokens.colors.secondary[800],
    fontWeight: tokens.typography.fontWeight.medium,
  }
})

const CardFooter = styled(Box)<{
  custompadding?: CardProps['padding']
}>(({ theme, custompadding = 'md' }) => {
  const { tokens } = theme

  const paddingMap = {
    sm: tokens.spacing.md,
    md: tokens.spacing.lg,
    lg: tokens.spacing.xl,
  }

  return {
    padding: `0 ${paddingMap[custompadding]}px ${paddingMap[custompadding]}px`,
    borderTop: `1px solid ${tokens.surface.border}`,
    marginTop: paddingMap[custompadding],
  }
})

/**
 * Minimalistic Card component with clean design
 */
export default function Card({
  elevation = 1,
  padding = 'md',
  header,
  footer,
  children,
  ...props
}: CardProps) {
  const { tokens } = (global as any).theme || { tokens: { elevation: { 1: '', 2: '', 3: '' } } }

  return (
    <StyledCard
      custompadding={padding}
      sx={{
        boxShadow: tokens?.elevation?.[elevation] || undefined,
        ...props.sx,
      }}
      {...props}
    >
      {header && (
        <CardHeader custompadding={padding}>
          {header}
        </CardHeader>
      )}

      <CardContent custompadding={padding}>
        {children}
      </CardContent>

      {footer && (
        <CardFooter custompadding={padding}>
          {footer}
        </CardFooter>
      )}
    </StyledCard>
  )
}

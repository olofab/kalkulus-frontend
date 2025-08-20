/**
 * Enhanced Tabs component with design system styling
 * Supports standard and segmented variants
 */

import React from 'react'
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
  /** Tab items */
  items: Array<{
    label: string
    value: string | number
    disabled?: boolean
  }>
  /** Active tab value */
  value: string | number
  /** Change handler */
  onChange: (value: string | number) => void
}

const StyledTabs = styled(MuiTabs)(({ theme }) => {
  const { tokens } = theme

  return {
    '& .MuiTabs-indicator': {
      height: 3,
      borderRadius: tokens.radius.round,
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTabs-flexContainer': {
      gap: tokens.spacing.sm,
    },
  }
})

const StyledTab = styled(MuiTab)(({ theme }) => {
  const { tokens } = theme

  return {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: tokens.radius.md,
    transition: tokens.transitions.fast,
    minHeight: 40,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
    '&.Mui-selected': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
    '&:focus-visible': {
      outline: `2px solid ${alpha(theme.palette.primary.main, 0.35)}`,
      outlineOffset: '2px',
    },
  }
})

/**
 * Tabs component with design system styling
 */
export default function Tabs({
  items,
  value,
  onChange,
  ...props
}: TabsProps) {
  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    onChange(newValue)
  }

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      {...props}
    >
      {items.map((item) => (
        <StyledTab
          key={item.value}
          label={item.label}
          value={item.value}
          disabled={item.disabled}
        />
      ))}
    </StyledTabs>
  )
}

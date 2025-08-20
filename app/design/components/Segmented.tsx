/**
 * Segmented control component with iOS-style pill design
 * Features sliding selection indicator and keyboard accessibility
 */

import React, { useRef, useEffect, useState } from 'react'
import { Box, ButtonBase, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface SegmentedProps {
  /** Segment items */
  items: Array<{
    label: string
    value: string | number
    disabled?: boolean
  }>
  /** Active segment value */
  value: string | number
  /** Change handler */
  onChange: (value: string | number) => void
  /** Full width */
  fullWidth?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
}

const SegmentedContainer = styled(Box)<{
  fullwidth?: boolean
}>(({ theme, fullwidth }) => {
  const { tokens } = theme

  return {
    position: 'relative',
    display: 'inline-flex',
    width: fullwidth ? '100%' : 'auto',
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
    borderRadius: tokens.radius.round,
    border: `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
    padding: 2,
  }
})

const SegmentButton = styled(ButtonBase)<{
  customisactive?: 'true' | 'false'
  customsize?: 'sm' | 'md'
  customfullwidth?: boolean
}>(({ theme, customisactive, customsize = 'md', customfullwidth }) => {
  const { tokens } = theme

  const sizeStyles = {
    sm: {
      padding: `${tokens.spacing.xs}px ${tokens.spacing.md}px`,
      fontSize: '13px',
      minHeight: 28,
    },
    md: {
      padding: `${tokens.spacing.sm}px ${tokens.spacing.lg}px`,
      fontSize: '14px',
      minHeight: 32,
    },
  }

  return {
    position: 'relative',
    zIndex: 2,
    borderRadius: tokens.radius.round,
    transition: tokens.transitions.fast,
    fontWeight: 500,
    textTransform: 'none',
    color: customisactive === 'true' ? 'white' : theme.palette.text.secondary,
    flex: customfullwidth ? 1 : 'none',
    '&:hover': {
      backgroundColor: customisactive === 'true' ? 'transparent' : alpha(theme.palette.grey[500], 0.08),
    },
    '&:focus-visible': {
      outline: `2px solid ${alpha(theme.palette.primary.main, 0.35)}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ...sizeStyles[customsize],
  }
})

const SelectionIndicator = styled(Box)<{
  customsize?: 'sm' | 'md'
}>(({ theme, customsize = 'md' }) => {
  const { tokens } = theme

  const heightMap = {
    sm: 28,
    md: 32,
  }

  return {
    position: 'absolute',
    top: 2,
    left: 2,
    height: heightMap[customsize],
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    borderRadius: tokens.radius.round,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1,
  }
})

/**
 * Segmented control with iOS-style pill design and sliding indicator
 */
export default function Segmented({
  items,
  value,
  onChange,
  fullWidth = false,
  size = 'md',
}: SegmentedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  })

  // Update indicator position when value changes
  useEffect(() => {
    if (!containerRef.current) return

    const activeIndex = items.findIndex(item => item.value === value)
    if (activeIndex === -1) return

    const buttons = containerRef.current.querySelectorAll('[data-segment-button]')
    const activeButton = buttons[activeIndex] as HTMLElement

    if (activeButton) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      setIndicatorStyle({
        width: buttonRect.width,
        left: buttonRect.left - containerRect.left - 2, // Account for container padding
      })
    }
  }, [value, items])

  const handleKeyDown = (event: React.KeyboardEvent, itemValue: string | number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onChange(itemValue)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const currentIndex = items.findIndex(item => item.value === value)
      const direction = event.key === 'ArrowRight' ? 1 : -1
      const nextIndex = (currentIndex + direction + items.length) % items.length
      const nextItem = items[nextIndex]

      if (!nextItem.disabled) {
        onChange(nextItem.value)
      }
    }
  }

  return (
    <SegmentedContainer ref={containerRef} fullwidth={fullWidth}>
      <SelectionIndicator
        customsize={size}
        sx={{
          width: indicatorStyle.width,
          transform: `translateX(${indicatorStyle.left}px)`,
        }}
      />

      {items.map((item) => (
        <SegmentButton
          key={item.value}
          data-segment-button
          customisactive={item.value === value ? 'true' : 'false'}
          customsize={size}
          customfullwidth={fullWidth}
          disabled={item.disabled}
          onClick={() => onChange(item.value)}
          onKeyDown={(event) => handleKeyDown(event, item.value)}
          role="tab"
          aria-selected={item.value === value}
          tabIndex={item.value === value ? 0 : -1}
        >
          {item.label}
        </SegmentButton>
      ))}
    </SegmentedContainer>
  )
}

/**
 * Minimalistic SearchBar component with clean design
 * Mobile-friendly with refined aesthetics
 */

import React, { useState, useEffect, useCallback } from 'react'
import { InputAdornment, IconButton, alpha } from '@mui/material'
import { Search, X } from 'lucide-react'
import { useTheme } from '@mui/material/styles'
import Input, { InputProps } from './Input'

export interface SearchBarProps extends Omit<InputProps, 'onChange'> {
  /** Search value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Debounce delay in milliseconds */
  debounceMs?: number
  /** Clear button aria label */
  clearAriaLabel?: string
}

/**
 * Minimalistic SearchBar component with search icon, clear button, and debouncing
 */
export default function SearchBar({
  value = '',
  onChange,
  debounceMs = 300,
  placeholder = 'Søk...',
  clearAriaLabel = 'Tøm søk',
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value)
  const theme = useTheme()
  const { tokens } = theme

  // Debounced callback
  const debouncedOnChange = useCallback(
    debounceMs > 0
      ? (() => {
        let timeoutId: NodeJS.Timeout
        return (searchValue: string) => {
          clearTimeout(timeoutId)
          timeoutId = setTimeout(() => onChange?.(searchValue), debounceMs)
        }
      })()
      : (searchValue: string) => onChange?.(searchValue),
    [onChange, debounceMs]
  )

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value)
  }, [value])

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInternalValue(newValue)
    debouncedOnChange(newValue)
  }

  // Handle clear
  const handleClear = () => {
    setInternalValue('')
    onChange?.('')
  }

  return (
    <Input
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search
              size={18}
              color={tokens.colors.neutral[500]}
              style={{ opacity: 0.8 }}
            />
          </InputAdornment>
        ),
        endAdornment: internalValue && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClear}
              size="small"
              aria-label={clearAriaLabel}
              sx={{
                padding: '6px',
                borderRadius: tokens.radius.sm,
                color: tokens.colors.secondary[500],
                transition: tokens.transitions.normal,
                '&:hover': {
                  backgroundColor: alpha(tokens.colors.secondary[500], 0.08),
                  color: tokens.colors.secondary[700],
                  transform: 'scale(1.1)',
                },
              }}
            >
              <X size={14} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

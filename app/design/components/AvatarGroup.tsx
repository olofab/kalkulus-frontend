/**
 * AvatarGroup component for stacked avatars with overlap and borders
 * Features subtle border rings and overflow handling
 */

import React from 'react'
import { Box, Avatar, Typography, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export interface AvatarGroupProps {
  /** Avatar data */
  avatars: Array<{
    src?: string
    alt?: string
    name?: string
    initials?: string
  }>
  /** Maximum number of avatars to show */
  max?: number
  /** Avatar size */
  size?: 'sm' | 'md' | 'lg'
  /** Overlap amount in pixels */
  overlap?: number
  /** Show border rings */
  showBorder?: boolean
  /** Click handler for individual avatars */
  onAvatarClick?: (index: number) => void
}

const AvatarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row-reverse', // Right to left stacking
}))

const StyledAvatar = styled(Avatar)<{
  customsize?: 'sm' | 'md' | 'lg'
  customoverlap?: number
  customshowborder?: boolean
  customindex?: number
}>(({ theme, customsize = 'md', customoverlap = 8, customshowborder = true, customindex = 0 }) => {
  const { tokens } = theme

  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const size = sizeMap[customsize]

  return {
    width: size,
    height: size,
    fontSize: customsize === 'sm' ? '12px' : customsize === 'lg' ? '16px' : '14px',
    fontWeight: 600,
    marginLeft: customindex > 0 ? -customoverlap : 0,
    border: customshowborder ? `2px solid ${theme.palette.background.paper}` : 'none',
    boxShadow: tokens.elevation[1],
    cursor: 'pointer',
    transition: tokens.transitions.fast,
    position: 'relative',
    zIndex: 10 - customindex, // Higher index = lower z-index for proper stacking
    '&:hover': {
      transform: 'scale(1.05)',
      zIndex: 20,
    },
  }
})

const OverflowAvatar = styled(Avatar)<{
  customsize?: 'sm' | 'md' | 'lg'
  customoverlap?: number
}>(({ theme, customsize = 'md', customoverlap = 8 }) => {
  const { tokens } = theme

  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const size = sizeMap[customsize]

  return {
    width: size,
    height: size,
    fontSize: customsize === 'sm' ? '11px' : customsize === 'lg' ? '14px' : '12px',
    fontWeight: 600,
    marginLeft: -customoverlap,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
    color: theme.palette.text.secondary,
    boxShadow: tokens.elevation[1],
  }
})

/**
 * AvatarGroup component for displaying stacked user avatars
 */
export default function AvatarGroup({
  avatars,
  max = 5,
  size = 'md',
  overlap = 8,
  showBorder = true,
  onAvatarClick,
}: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max)
  const overflowCount = Math.max(0, avatars.length - max)

  const getInitials = (name?: string, initials?: string): string => {
    if (initials) return initials
    if (!name) return '?'

    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AvatarContainer>
      {/* Overflow indicator */}
      {overflowCount > 0 && (
        <OverflowAvatar
          customsize={size}
          customoverlap={overlap}
        >
          +{overflowCount}
        </OverflowAvatar>
      )}

      {/* Avatar list (reversed for proper visual stacking) */}
      {displayAvatars.reverse().map((avatar, reverseIndex) => {
        const actualIndex = displayAvatars.length - 1 - reverseIndex

        return (
          <StyledAvatar
            key={actualIndex}
            src={avatar.src}
            alt={avatar.alt || avatar.name}
            customsize={size}
            customoverlap={overlap}
            customshowborder={showBorder}
            customindex={reverseIndex}
            onClick={() => onAvatarClick?.(actualIndex)}
          >
            {!avatar.src && getInitials(avatar.name, avatar.initials)}
          </StyledAvatar>
        )
      })}
    </AvatarContainer>
  )
}

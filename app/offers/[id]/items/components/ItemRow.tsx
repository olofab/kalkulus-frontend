'use client'

import { useState } from 'react'
import {
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  useTheme
} from '@mui/material'
import { Add, LocalOffer } from '@mui/icons-material'
import { Item } from '../../../../hooks/items'

interface ItemRowProps {
  item: Item
  onAdd: (itemId: number, quantity: number) => void
  isLoading?: boolean
}

export default function ItemRow({ item, onAdd, isLoading = false }: ItemRowProps) {
  const theme = useTheme()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    onAdd(item.id, quantity)
    setQuantity(1) // Reset quantity after adding
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        p: 2,
        mb: 1,
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {/* Left side - Item info */}
        <Box flex={1} mr={2}>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            {item.icon && (
              <Typography fontSize="1.2em" component="span">
                {item.icon}
              </Typography>
            )}
            <Typography variant="subtitle1" fontWeight={600}>
              {item.name}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocalOffer
              sx={{
                fontSize: 16,
                color: 'text.secondary'
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {item.unitPrice.toLocaleString('no-NO')} kr/stk
            </Typography>
          </Box>

          {/* Categories */}
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {item.categories.map(category => (
              <Chip
                key={category.id}
                label={category.name}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Right side - Quantity and Add */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Quantity selector */}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1.5,
              overflow: 'hidden'
            }}
          >
            <IconButton
              size="small"
              onClick={decrementQuantity}
              disabled={quantity <= 1 || isLoading}
              sx={{
                borderRadius: 0,
                minWidth: 32,
                height: 32,
                fontSize: '1.2rem'
              }}
            >
              −
            </IconButton>

            <Typography
              variant="body2"
              sx={{
                minWidth: 32,
                textAlign: 'center',
                py: 0.5,
                backgroundColor: 'background.default',
                borderLeft: `1px solid ${theme.palette.divider}`,
                borderRight: `1px solid ${theme.palette.divider}`
              }}
            >
              {quantity}
            </Typography>

            <IconButton
              size="small"
              onClick={incrementQuantity}
              disabled={isLoading}
              sx={{
                borderRadius: 0,
                minWidth: 32,
                height: 32,
                fontSize: '1.2rem'
              }}
            >
              +
            </IconButton>
          </Box>

          {/* Add button */}
          <Button
            variant="contained"
            size="small"
            onClick={handleAdd}
            disabled={isLoading}
            startIcon={<Add />}
            aria-label={`Legg til ${item.name}`}
            sx={{
              borderRadius: 1.5,
              px: 2,
              py: 1,
              minWidth: 'auto'
            }}
          >
            Legg til
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

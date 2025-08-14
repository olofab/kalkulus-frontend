'use client'
import { Box, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

export type Item = {
  id: number
  name: string
  unitPrice: number
  quantity: number
  categories?: number[]
}

export type AddItem = {
  templateId: number
  quantity: number
}

type Props = {
  items: Item[]
  onQuantityChange: (item: Item, newQuantity: number) => void
  onRemove: (item: Item) => void
}

export default function ItemList({ items, onQuantityChange, onRemove }: Props) {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton edge="end" onClick={() => onRemove(item)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={item.name}
            secondary={`Enhetspris: ${item.unitPrice} kr`}
          />
          <Box sx={{ ml: 2 }}>
            <TextField
              label="Antall"
              type="number"
              size="small"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item, Number(e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ width: 80 }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  )
}
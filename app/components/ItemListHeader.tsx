'use client'

import {
  Box, TextField, IconButton, Collapse, Stack, Button, InputAdornment
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import axios from 'axios'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function ItemListHeader({ onCreated, onSearch }: {
  onCreated: () => void,
  onSearch: (term: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', unitPrice: '' })

  const handleCreate = async () => {
    const name = newItem.name.trim()
    const price = parseFloat(newItem.unitPrice)
    if (!name || isNaN(price) || price <= 0) return

    await axios.post('/api/items/templates', { name, unitPrice: price })
    setNewItem({ name: '', unitPrice: '' })
    setExpanded(false)
    onCreated()
  }

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <TextField
          placeholder="Søk etter vare"
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'background.paper',
              height: 40, // match IconButton
              paddingRight: 0,
            }
          }}
          inputProps={{
            sx: {
              height: '100%',
            }
          }}
          fullWidth
        />
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            width: 40,
            height: 40,
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          {expanded ? <KeyboardArrowUpIcon /> : <AddIcon />}
        </IconButton>
      </Stack>

      <Collapse in={expanded}>
        <Stack spacing={1} mb={2}>
          <TextField
            label="Varenavn"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Enhetspris"
            type="number"
            value={newItem.unitPrice}
            onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
            fullWidth
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreate}
            sx={{ borderRadius: 0 }}
          >
            Lagre vare
          </Button>
        </Stack>
      </Collapse>
    </Box>
  )
}

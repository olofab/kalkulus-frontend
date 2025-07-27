'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { apiGet, apiPost, apiDelete } from '../lib/api'
import { Category } from '../types/itemTemplates'


export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await apiGet('/api/categories')
      setCategories(data)
    } catch {
      // handle error
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return
    const res = await apiPost('/api/categories', { name: newCategoryName })
    setCategories(prev => [...prev, res])
    setNewCategoryName('')
  }

  const handleDelete = async (id: number) => {
    await apiDelete(`/api/categories/${id}`)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Kategorier
      </Typography>

      <Box display="flex" gap={1} mb={2}>
        <TextField
          label="Ny kategori"
          fullWidth
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          Legg til
        </Button>
      </Box>

      <Paper>
        <List>
          {categories.map(category => (
            <ListItem
              key={category.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(category.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

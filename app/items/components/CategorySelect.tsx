'use client'

import {
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material'
import { useState } from 'react'
import { useCategories } from '../hooks/useItems'
import { useCreateCategory } from '../hooks/useCreateCategory'

type Props = {
  value: number[]
  onChange: (ids: number[]) => void
}

export default function CategorySelect({ value, onChange }: Props) {
  const { data: categories = [] } = useCategories()
  const createCategory = useCreateCategory()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value as unknown as string[]

    if (raw.includes('new')) {
      setDialogOpen(true)
      return
    }

    const ids = raw.map(Number).filter((v) => !isNaN(v))
    onChange(ids)
  }

  const handleCreate = async () => {
    if (!newCategoryName.trim()) return
    const newCat = await createCategory.mutateAsync(newCategoryName)
    setDialogOpen(false)
    setNewCategoryName('')

    // Oppdater valgt liste med ny kategori
    onChange([...value, newCat.id])
  }

  return (
    <>
      <TextField
        select
        label="Kategorier"
        fullWidth
        value={value.map(String)} // MUI expects string[]
        onChange={handleChange}
        SelectProps={{ multiple: true }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id.toString()}>
            {cat.name}
          </MenuItem>
        ))}
        <MenuItem value="new" sx={{ fontStyle: 'italic' }}>
          + Legg til ny kategori
        </MenuItem>
      </TextField>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Ny kategori</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            label="Kategorinavn"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Avbryt</Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={createCategory.isPending}
          >
            {createCategory.isPending ? 'Legger til...' : 'Legg til'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

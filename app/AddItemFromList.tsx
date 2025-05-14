'use client'
import {
  Box, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import ConstructionIcon from '@mui/icons-material/Construction'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import GridOnIcon from '@mui/icons-material/GridOn'
import LayersIcon from '@mui/icons-material/Layers'

const predefinedItems = [
  { name: 'Gipsplate', unitPrice: 49, icon: <LayersIcon fontSize="large" /> },
  { name: 'Sparkel', unitPrice: 79, icon: <FormatPaintIcon fontSize="large" /> },
  { name: 'Skruer', unitPrice: 5, icon: <ConstructionIcon fontSize="large" /> },
  { name: 'Flis', unitPrice: 99, icon: <GridOnIcon fontSize="large" /> },
]

const NumericPad = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←']

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {keys.map((key) => (
        <Grid item xs={4} key={key}>
          <Button
            fullWidth
            variant='contained'
            sx={{
              height: 70,
              fontSize: 24,
              borderRadius: '50%',
              color: 'white'
            }}
            onClick={() => {
              if (key === '←') onChange(value.slice(0, -1))
              else onChange(value + key)
            }}
          >
            {key}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default function AddItemFromList() {
  const { id } = useParams()
  const router = useRouter()
  const [quantityStr, setQuantityStr] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const selectItem = (item: any) => {
    setSelected(item)
    setQuantityStr('')
    setDialogOpen(true)
  }

  const confirmAdd = async () => {
    const quantity = parseInt(quantityStr)
    if (!selected || !quantity || quantity <= 0) return

    await axios.post(`/api/offers/${id}/item`, {
      name: selected.name,
      unitPrice: selected.unitPrice,
      quantity
    })

    setDialogOpen(false)
    router.push(`/offers/${id}`) // Gå tilbake til redigeringsskjerm
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Velg vare</Typography>
      <Grid container spacing={2}>
        {predefinedItems.map((item, i) => (
          <Grid item xs={6} key={i}>
            <Card sx={{ height: 120, textAlign: 'center' }} onClick={() => selectItem(item)}>
              <CardContent>
                {item.icon}
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="caption">{item.unitPrice} kr/stk</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>{selected?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="h5" align="center">{quantityStr || '0'}</Typography>
          <NumericPad value={quantityStr} onChange={setQuantityStr} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Avbryt</Button>
          <Button variant="contained" onClick={confirmAdd}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

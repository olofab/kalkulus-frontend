'use client'

import {
  Box,
  Button,
  Drawer,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Divider,
  Card,
  CardContent,
  Stack,
  MenuItem,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import { AddItem, Item } from './ItemList'
import { useItemTemplates } from '../../../offers/hooks/useItemTemplates'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  open: boolean
  onClose: () => void
  onAddItem: (item: AddItem) => void
}

export default function AddItemDrawer({ open, onClose, onAddItem }: Props) {
  const { groupedTemplates, categories } = useItemTemplates()


  const [customName, setCustomName] = useState('')
  const [customPrice, setCustomPrice] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
      <Box p={2} pb={4}>
        {/* Legg til egendefinert vare - Default åpen */}
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<AddIcon />}>
            <Typography fontWeight={600}>Legg til ny vare</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Navn"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Pris (kr)"
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                fullWidth
              />
              <TextField
                select
                label="Kategori"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
                <MenuItem value={-1}>Annet</MenuItem>
              </TextField>

              <Button
                variant="contained"
                disabled={!customName || !customPrice}
                onClick={() => {

                  onAddItem({
                    templateId: 1,
                    quantity: 1
                  })
                  setCustomName('')
                  setCustomPrice('')
                  setSelectedCategoryId(-1)
                }}
              >
                Legg til ny vare
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>


        {/* Legg til eksisterende vare - sammenfoldet */}
        <Accordion elevation={0}>
          <AccordionSummary expandIcon={<AddIcon />}>
            <Typography fontWeight={600}>Legg til eksisterende vare</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {groupedTemplates.map((cat) => (
              <Accordion key={cat.id} elevation={0} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>{cat.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1} >
                    {cat.templates.map((tpl) => (
                      <Card
                        key={tpl.id}
                        onClick={() => onAddItem({
                          templateId: tpl.id,
                          quantity: 1
                        })}
                        sx={{ cursor: 'pointer' }}
                        elevation={0}
                      >
                        <CardContent sx={{ p: 0 }}>
                          <Typography>{tpl.name}</Typography>
                          <Typography color="text.secondary">{tpl.unitPrice} kr</Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  )
}

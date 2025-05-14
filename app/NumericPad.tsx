'use client'
import { Box, Button, Grid } from '@mui/material'

type Props = {
  value: string
  onChange: (newVal: string) => void
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←']

export default function NumericPad({ value, onChange }: Props) {
  const handleClick = (key: string) => {
    if (key === '←') {
      onChange(value.slice(0, -1))
    } else {
      onChange(value + key)
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {keys.map((key, index) => (
          <Grid item xs={4} key={index}>
            <Button
              fullWidth
              variant={key === '5' ? 'contained' : 'outlined'}
              sx={{
                height: 70,
                fontSize: 24,
                borderRadius: '50%',
                ...(key === '5' && { backgroundColor: '#DC9E80', color: 'white' })
              }}
              onClick={() => handleClick(key)}
            >
              {key}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

'use client'

import { Grid, Button } from '@mui/material'

const NumericPad = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←']

  return (
    <Grid container spacing={1} sx={{ mt: 1 }}>
      {keys.map((key) => (
        <Grid item xs={4} key={key}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 70,
              fontSize: 24,
              borderRadius: 0, // ← firkantet, juster evt. til 0
              color: 'white',
              minWidth: '100%',
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

export default NumericPad

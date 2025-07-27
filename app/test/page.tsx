'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import { apiGet, apiPost, apiPublicPost } from '../lib/api'
import axios from 'axios'

export default function TestPage() {
  const [response, setResponse] = useState<string>('')

  useEffect(() => {
    // Test GET
    const fetchData = async () => {
      try {
        const data = await apiGet('/api/company/me')
        setResponse(JSON.stringify(data, null, 2))
      } catch (err) {
        setResponse(`Feil: ${err}`)
      }
    }

    fetchData()
  }, [])

  const handlePost = async () => {
    try {
      const res = await apiPublicPost('/api/auth/register-company', {
        companyName: 'Bygg AS',
        organizationNumber: Math.random(),
        industry: 'Snekkering',
        name: 'Ola Byggern',
        email: 'ola@bygg.no',
        password: 'hemmeligPass123'
      })

      setResponse('Registrering vellykket')
    } catch (err) {
      setResponse(`Feil ved registrering: ${err}`)
    }
  }

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Test API-kall</Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="outlined" onClick={handlePost}>Test POST</Button>
      </Stack>

      <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', bgcolor: '#f5f5f5', p: 2 }}>
        {response}
      </Typography>
    </Box>
  )
}

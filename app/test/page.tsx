'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Button, Stack, Card, CardContent, Chip } from '@mui/material'
import { apiGet, apiPost, apiPublicPost } from '../lib/api'
import { runApiTests, testApiConnection } from '../lib/api-test'
import config from '../lib/config'

interface TestResult {
  success: boolean
  data?: any
  error?: string
}

export default function TestPage() {
  const [response, setResponse] = useState<string>('')
  const [connectionTest, setConnectionTest] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Test GET on component mount
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

  const handleConnectionTest = async () => {
    setIsLoading(true)
    const result = await testApiConnection()
    setConnectionTest(result)
    setIsLoading(false)
  }

  const handleFullApiTest = async () => {
    setIsLoading(true)
    const results = await runApiTests()
    setResponse(JSON.stringify(results, null, 2))
    setIsLoading(false)
  }

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
      <Typography variant="h4" gutterBottom>🔧 API Test Dashboard</Typography>

      {/* Configuration Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>⚙️ Current Configuration</Typography>
          <Typography variant="body2" color="text.secondary">API URL: {config.apiUrl}</Typography>
          <Typography variant="body2" color="text.secondary">Environment: {config.isDevelopment ? 'Development' : 'Production'}</Typography>
          <Typography variant="body2" color="text.secondary">Timeout: {config.apiTimeout}ms</Typography>
        </CardContent>
      </Card>

      {/* Connection Test */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>🔗 Connection Test</Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Button
              variant="outlined"
              onClick={handleConnectionTest}
              disabled={isLoading}
            >
              Test Connection
            </Button>
            {connectionTest && (
              <Chip
                label={connectionTest.success ? "Connected" : "Failed"}
                color={connectionTest.success ? "success" : "error"}
              />
            )}
          </Stack>
          {connectionTest && !connectionTest.success && (
            <Typography variant="body2" color="error">
              Error: {connectionTest.error}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* API Tests */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>🧪 API Tests</Typography>
          <Stack direction="row" spacing={2} mb={3}>
            <Button
              variant="outlined"
              onClick={handlePost}
              disabled={isLoading}
            >
              Test Registration
            </Button>
            <Button
              variant="outlined"
              onClick={handleFullApiTest}
              disabled={isLoading}
            >
              Run All Tests
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Response Display */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>📋 Response</Typography>
          <Typography
            variant="body1"
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              bgcolor: '#f5f5f5',
              p: 2,
              borderRadius: 1,
              maxHeight: '400px',
              overflow: 'auto'
            }}
          >
            {response || 'No response yet...'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

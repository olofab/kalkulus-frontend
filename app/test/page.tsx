'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Button, Stack, Card, CardContent, Chip } from '@mui/material'
import { apiGet, apiPost, apiPublicPost } from '../lib/api'
import { runApiTests, testApiConnection } from '../lib/api-test'
import { debugToken, testAuthenticatedEndpoint } from '../lib/debug'
import config from '../lib/config'

interface TestResult {
  success: boolean
  data?: any
  error?: string
}

export default function TestPage() {
  const [response, setResponse] = useState<string>('Click a button below to test API connectivity...')
  const [connectionTest, setConnectionTest] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Removed automatic API call to prevent redirect issues on page load
  // Users can manually test API calls using the buttons below

  const handleCompanyMeTest = async () => {
    setIsLoading(true)
    try {
      const data = await apiGet('/api/company/me')
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setResponse(`Error testing /api/company/me: ${err}`)
    }
    setIsLoading(false)
  }

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

      console.log('🔍 Registration response:', res)
      console.log('🔍 Response structure:', Object.keys(res))
      console.log('🔍 Token in response:', res.token)
      
      if (res.token) {
        localStorage.setItem('token', res.token)
        console.log('✅ Token stored in localStorage')
      } else {
        console.log('❌ No token in response!')
      }

      setResponse(`Registrering vellykket. Token: ${res.token ? 'JA' : 'NEI'}`)
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
              onClick={handleCompanyMeTest}
              disabled={isLoading}
            >
              Test Company/Me
            </Button>
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

      {/* Debug Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>🔍 Debug Tools</Typography>
          <Stack direction="row" spacing={2} mb={2}>
            <Button
              variant="outlined"
              onClick={() => {
                const token = localStorage.getItem('token')
                console.log('🔍 Current token:', token)
                setResponse(`Current token: ${token || 'NONE'}`)
              }}
              disabled={isLoading}
            >
              Check Token
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                // Set a fake test token for testing purposes
                const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                localStorage.setItem('token', testToken)
                console.log('✅ Test token set')
                setResponse('Test token set in localStorage')
              }}
              disabled={isLoading}
            >
              Set Test Token
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                debugToken()
                setResponse('Token debug info printed to console')
              }}
              disabled={isLoading}
            >
              Debug Token
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                setIsLoading(true)
                const response = await testAuthenticatedEndpoint()
                setResponse(`Raw endpoint test - Status: ${response?.status || 'Failed'}`)
                setIsLoading(false)
              }}
              disabled={isLoading}
            >
              Test /me Endpoint
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                localStorage.removeItem('token')
                setResponse('Token cleared from localStorage')
              }}
              disabled={isLoading}
            >
              Clear Token
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

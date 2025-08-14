// lib/api-test.ts
import { apiPublicGet } from './api'
import config from './config'

/**
 * Test API connectivity
 * Call this function to verify your backend connection
 */
export async function testApiConnection() {
  console.log('🔍 Testing API connection...')
  console.log('📡 API URL:', config.apiUrl)

  try {
    // Test with an API endpoint that likely has CORS configured
    const response = await fetch(`${config.apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.text()
      console.log('✅ API connection successful!')
      console.log('📊 Response:', data)
      return { success: true, data }
    } else if (response.status === 401) {
      // 401 is expected for unauthenticated requests - this means connection works
      console.log('✅ API connection successful! (401 expected for unauthenticated request)')
      return { success: true, data: 'Connection successful - authentication required' }
    } else {
      console.warn('⚠️ API responded with status:', response.status)
      return { success: false, error: `HTTP ${response.status}` }
    }
  } catch (error) {
    console.error('❌ API connection failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Test authenticated API call using our API client
 * This should work better as it goes through our configured API client
 */
export async function testAuthenticatedCall() {
  console.log('🔐 Testing API call through our API client...')

  try {
    // Test a simple public endpoint first
    const offers = await apiPublicGet('/api/offers')
    console.log('✅ API client call successful!')
    console.log('📊 Data received:', offers)
    return { success: true, data: offers }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log('✅ API client connection successful! (401 expected for unauthenticated request)')
      return { success: true, data: 'API client works - authentication required' }
    }
    console.error('❌ API client call failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Run all API tests
 */
export async function runApiTests() {
  console.log('🚀 Running API connectivity tests...')

  const results = {
    directConnection: await testApiConnection(),
    apiClientTest: await testAuthenticatedCall(),
  }

  console.log('📋 Test Results:', results)
  return results
}

// Export for use in components or pages
export default {
  testApiConnection,
  testAuthenticatedCall,
  runApiTests,
}

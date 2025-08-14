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
    // Try to make a simple request to test connectivity
    // You might want to create a /api/health endpoint on your backend
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
    } else {
      console.warn('⚠️ API responded with non-200 status:', response.status)
      return { success: false, error: `HTTP ${response.status}` }
    }
  } catch (error) {
    console.error('❌ API connection failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Test authenticated API call
 * Call this function to test if authentication is working
 */
export async function testAuthenticatedCall() {
  console.log('🔐 Testing authenticated API call...')

  try {
    // This assumes you have a /api/offers endpoint that requires authentication
    const offers = await apiPublicGet('/api/offers')
    console.log('✅ Authenticated call successful!')
    console.log('📊 Data received:', offers)
    return { success: true, data: offers }
  } catch (error) {
    console.error('❌ Authenticated call failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Run all API tests
 */
export async function runApiTests() {
  console.log('🚀 Running API connectivity tests...')

  const results = {
    connection: await testApiConnection(),
    // Uncomment when you want to test authentication
    // authentication: await testAuthenticatedCall(),
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

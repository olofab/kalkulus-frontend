import { API_BASE_URL } from './api'

// Token debugging utilities
export const debugToken = () => {
  if (typeof window === 'undefined') {
    console.log('🔍 Token Debug: Running on server side')
    return
  }

  const token = localStorage.getItem('token')
  
  console.log('🔍 Token Debug:')
  console.log('  - Token exists:', !!token)
  
  if (token) {
    console.log('  - Token length:', token.length)
    console.log('  - Token preview:', token.substring(0, 30) + '...')
    
    try {
      // Try to decode JWT (basic check)
      const parts = token.split('.')
      console.log('  - Token parts:', parts.length)
      
      if (parts.length === 3) {
        const header = JSON.parse(atob(parts[0]))
        const payload = JSON.parse(atob(parts[1]))
        
        console.log('  - Token header:', header)
        console.log('  - Token payload:', payload)
        console.log('  - Token expires:', new Date(payload.exp * 1000))
        console.log('  - Token expired:', payload.exp * 1000 < Date.now())
      }
    } catch (e) {
      console.log('  - Token decode error:', e)
    }
  }
}

export const testAuthenticatedEndpoint = async () => {
  console.log('🧪 Testing authenticated endpoint...')
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log('🧪 Response status:', response.status)
    console.log('🧪 Response headers:', Object.fromEntries(response.headers.entries()))
    
    const data = await response.text()
    console.log('🧪 Response body:', data)
    
    return response
  } catch (error) {
    console.error('🧪 Request failed:', error)
    return null
  }
}

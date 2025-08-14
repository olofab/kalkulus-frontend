// lib/config.ts
export const config = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081',

  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // API timeout settings
  apiTimeout: 30000, // 30 seconds

  // Feature flags
  enableLogging: process.env.NODE_ENV === 'development',

  // Auth configuration
  tokenKey: 'token',

  // Validation
  validateConfig() {
    if (!this.apiUrl) {
      throw new Error('API URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable.')
    }

    if (this.isProduction && this.apiUrl.includes('localhost')) {
      console.warn('⚠️ Warning: Using localhost API URL in production environment!')
    }

    if (this.enableLogging) {
      console.log('🔧 API Configuration:', {
        apiUrl: this.apiUrl,
        environment: process.env.NODE_ENV,
        timeout: this.apiTimeout
      })
    }
  }
}

// Validate configuration on import
config.validateConfig()

export default config

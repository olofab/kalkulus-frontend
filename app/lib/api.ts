import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { Offer } from '../types/offer'
import config from './config'

// Environment configuration
export const API_BASE_URL = config.apiUrl

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔗 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    }

    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`)
    }
    return response
  },
  (error: AxiosError) => {
    const errorMessage = getErrorMessage(error)

    // Handle different error types
    if (error.response?.status === 401) {
      console.warn('🔒 Unauthorized access - redirecting to login')
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        // Only redirect if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }
    } else if (error.response?.status === 403) {
      console.error('🚫 Access forbidden:', error.response.data)
    } else if (error.response?.status >= 500) {
      console.error('🔥 Server error:', error.response.data)
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout')
    } else if (!error.response) {
      console.error('📡 Network error - please check your connection')
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', errorMessage)
    }

    return Promise.reject(error)
  }
)

// Helper function to extract meaningful error messages
function getErrorMessage(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data as any
    return data.message || data.error || 'Unknown server error'
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timeout'
  }

  if (!error.response) {
    return 'Network connection error'
  }

  return error.message || 'Unknown error occurred'
}

// 🔐 Helper function to get auth headers (legacy support)
function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 🔓 Public API methods (no auth required)
export const apiPublicPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post(url, data, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(config?.headers || {}),
    },
    // Remove auth header for public requests
    transformRequest: [
      function (data, headers) {
        delete headers.Authorization
        return JSON.stringify(data)
      }
    ]
  })
  return response.data
}

export const apiPublicGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get(url, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(config?.headers || {}),
    },
    // Remove auth header for public requests
    transformRequest: [
      function (data, headers) {
        delete headers.Authorization
        return data
      }
    ]
  })
  return response.data
}

// 🔐 Authenticated API methods
export const apiGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get(url, config)
  return response.data
}

export const apiPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post(url, data, config)
  return response.data
}

export const apiPut = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.put(url, data, config)
  return response.data
}

export const apiDelete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete(url, config)
  return response.data
}

// Legacy API methods (update these to use the new methods)
export const fetchOffer = async (id: string | number): Promise<Offer> => {
  return await apiGet<Offer>(`/api/offers/${id}`)
}

export const fetchOffers = async (): Promise<Offer[]> => {
  return await apiGet<Offer[]>(`/api/offers`)
}

export const createOffer = async (offerData: Partial<Offer>): Promise<Offer> => {
  return await apiPost<Offer>('/api/offers', offerData)
}

export const deleteOffer = async (id: number | string): Promise<void> => {
  await apiDelete(`/api/offers/${id}`)
}

export const addItemToOffer = async (offerId: number, item: { name: string; unitPrice: number; quantity: number }): Promise<void> => {
  await apiPost(`/api/offers/${offerId}/item`, item)
}

export const deleteItem = async (itemId: number): Promise<void> => {
  await apiDelete(`/api/items/${itemId}`)
}

export const updateOffer = async (id: number, data: Partial<Offer>) => {
  return await apiPut(`/api/offers/${id}`, data)
}

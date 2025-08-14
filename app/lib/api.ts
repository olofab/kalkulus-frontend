import axios, { AxiosRequestConfig } from 'axios'
import { Offer } from '../types/offer'

export const fetchOffer = async (id: string | number): Promise<Offer> => {
  return await apiGet<Offer>(`/api/offers/${id}`)
}

export const fetchOffers = async (): Promise<Offer[]> => {
  const res = apiGet<Offer[]>(`/api/offers`)
  return res
}

export const createOffer = async (offerData: Partial<Offer>): Promise<Offer> => {
  const res = await axios.post<Offer>('/api/offers', offerData)
  return res.data
}

export const deleteOffer = async (id: number | string): Promise<void> => {
  await axios.delete(`/api/offers/${id}`)
}

export const addItemToOffer = async (offerId: number, item: { name: string; unitPrice: number; quantity: number }): Promise<void> => {
  await axios.post(`/api/offers/${offerId}/item`, item)
}

export const deleteItem = async (itemId: number): Promise<void> => {
  await axios.delete(`/api/items/${itemId}`)
}

export const updateOffer = async (id: number, data: Partial<Offer>) => {
  const res = await apiPut(`/api/offers/${id}`, data)
  return res.data
}

// /lib/api.ts





export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

// 🔐 Hent token fra localStorage og returner som headers
function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// 🔓 Brukes for public (f.eks. registrering og login)
export const apiPublicPost = async <T = any>(url: string, data?: any): Promise<T> => {
  const res = await axios.post(`${API_BASE_URL}${url}`, data, {
    headers: { 'Content-Type': 'application/json' },
  })
  return res.data
}

export const apiPublicGet = async <T = any>(url: string,): Promise<T> => {
  const res = await axios.get(`${API_BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  return res.data
}

// 🔐 GET med token
export const apiGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res = await axios.get(`${API_BASE_URL}${url}`, {
    ...config,
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    }
  })
  return res.data
}

// 🔐 POST med token
export const apiPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res = await axios.post(`${API_BASE_URL}${url}`, data, {
    ...config,
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
      ...(config?.headers || {})
    }
  })
  return res.data
}

// 🔐 PUT med token
export const apiPut = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const res = await axios.put(`${API_BASE_URL}${url}`, data, {
    ...config,
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
      ...(config?.headers || {})
    }
  })
  return res.data
}

// 🔐 DELETE med token
export const apiDelete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const res = await axios.delete(`${API_BASE_URL}${url}`, {
    ...config,
    headers: {
      ...getAuthHeaders(),
      ...(config?.headers || {})
    }
  })
  return res.data
}

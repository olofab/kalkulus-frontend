import axios from 'axios'
import { Offer } from '../types/offer'

export const fetchOffer = async (id: string | number): Promise<Offer> => {
  const res = await axios.get<Offer>(`/api/offers/${id}`)
  return res.data
}

export const fetchOffers = async (): Promise<Offer[]> => {
  const res = await axios.get<Offer[]>(`/api/offers`)
  return res.data
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
  const res = await axios.put(`/api/offers/${id}`, data)
  return res.data
}
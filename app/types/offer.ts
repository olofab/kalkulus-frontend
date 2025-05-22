export type Item = {
  id: number
  name: string
  unitPrice: number
  quantity: number
}

export type ItemInput = {
  name: string
  unitPrice: number
  quantity: number
}

export type Offer = {
  id: number
  title: string
  status: OfferStatus
  createdAt: string // ISO string from backend
  updatedAt: string
  validUntil: string | null

  customer: string
  contactPerson: string
  phone: string
  email: string
  address: string

  description: string
  totalSum: number

  items: Item[]
}

export enum OfferStatus {
  Draft = "draft",
  Sent = "sent",
  Accepted = "accepted",
  Rejected = "rejected",
}
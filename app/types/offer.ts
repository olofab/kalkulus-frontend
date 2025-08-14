
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


export enum OfferStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  COMPLETED = "COMPLETED",
}

export type CreateOffer = {
  title: string
  status?: string
  customer: string
  contactPerson: string
  phone: string
  email: string
  address: string
  description?: string
  validUntil?: string // Use ISO date string format: "YYYY-MM-DD"
  includeVat?: boolean
  items?: Item[] // Optional on create
}

export type OfferResponse = {
  id: number
  title: string
  status: string
  customer: string
  contactPerson: string
  phone: string
  email: string
  address: string
  description?: string
  validUntil?: string // ISO date
  createdAt: string
  updatedAt: string
  includeVat: boolean
  totalSum: number
  totalSumWithVat: number
  items: Item[]
}

export type NewOfferPayload = {
  title: string
  customer: string
  contactPerson?: string
  phone?: string
  email?: string
  address?: string
  description?: string
  validUntil: string
  includeVat: boolean
  status: string
}

export type OfferAPI = CreateOffer & {
  id: number
  createdAt: string
  updatedAt: string
  companyId: number
  items: Item[]
}

export type Offer = {
  id: number
  title: string
  status: string
  customer: string
  contactPerson: string
  phone: string
  email: string
  address: string
  description?: string
  validUntil?: string // use ISO string for LocalDate
  createdAt: string // ISO string for LocalDateTime
  updatedAt: string // ISO string for LocalDateTime
  includeVat: boolean
  totalSum: number
  totalSumWithVat: number
  items: Item[]
}
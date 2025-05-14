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
  createdAt: string // or Date if parsed
  updatedAt: string // or Date if parsed
  items: Item[]
  totalSum: number
  customer: string
}

export enum OfferStatus {
  Draft = "draft",
  Sent = "sent",
  Accepted = "accepted",
  Rejected = "rejected",
}
export type ItemInput = {
  name: string
  unitPrice: number
  quantity: number
}

export type Item = {
  id: number
  name: string
  quantity: number
  unitPrice: number
  offerId?: number
}
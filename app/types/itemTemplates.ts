export type Category = {
  id: number
  name: string
  companyId: number
}

export type ItemTemplate = {
  id: number
  name: string
  unitPrice: number
  categories: Category[]
}

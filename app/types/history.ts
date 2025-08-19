export interface HistoryEvent {
  id: number
  type: 'CREATED' | 'STATUS_CHANGED' | 'ITEM_ADDED' | 'ITEM_REMOVED' | 'ITEM_UPDATED' | 'OFFER_UPDATED' | 'OFFER_DELETED'
  description: string
  timestamp: string
  userId?: number
  userName?: string
  metadata?: {
    previousValue?: string
    newValue?: string
    itemName?: string
    fieldName?: string
    [key: string]: any
  }
}

export interface OfferHistory {
  offerId: number
  events: HistoryEvent[]
  totalEvents: number
}

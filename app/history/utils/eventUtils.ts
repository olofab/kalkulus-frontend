import { HistoryEvent } from '../../types/history'
import {
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  FileText,
  Package,
  RefreshCw,
  AlertCircle
} from 'lucide-react'

export const getEventIcon = (eventType: HistoryEvent['type']) => {
  switch (eventType) {
    case 'CREATED':
      return FileText
    case 'STATUS_CHANGED':
      return RotateCcw
    case 'ITEM_ADDED':
      return Plus
    case 'ITEM_REMOVED':
      return Trash2
    case 'ITEM_UPDATED':
      return Edit
    case 'OFFER_UPDATED':
      return RefreshCw
    case 'OFFER_DELETED':
      return AlertCircle
    default:
      return Package
  }
}

export const getEventColor = (eventType: HistoryEvent['type']) => {
  switch (eventType) {
    case 'CREATED':
      return 'success'
    case 'STATUS_CHANGED':
      return 'info'
    case 'ITEM_ADDED':
      return 'success'
    case 'ITEM_REMOVED':
      return 'error'
    case 'ITEM_UPDATED':
      return 'warning'
    case 'OFFER_UPDATED':
      return 'info'
    case 'OFFER_DELETED':
      return 'error'
    default:
      return 'default'
  }
}

export const formatEventDescription = (event: HistoryEvent): string => {
  if (event.description) {
    return event.description
  }

  // Fallback description based on type
  switch (event.type) {
    case 'CREATED':
      return 'Tilbud opprettet'
    case 'STATUS_CHANGED':
      return `Status endret ${event.metadata?.previousValue ? `fra ${event.metadata.previousValue} ` : ''}til ${event.metadata?.newValue || 'ny status'}`
    case 'ITEM_ADDED':
      return `Vare lagt til: ${event.metadata?.itemName || 'ukjent vare'}`
    case 'ITEM_REMOVED':
      return `Vare fjernet: ${event.metadata?.itemName || 'ukjent vare'}`
    case 'ITEM_UPDATED':
      return `Vare oppdatert: ${event.metadata?.itemName || 'ukjent vare'}`
    case 'OFFER_UPDATED':
      return `Tilbud oppdatert: ${event.metadata?.fieldName || 'felt'}`
    case 'OFFER_DELETED':
      return 'Tilbud slettet'
    default:
      return 'Ukjent hendelse'
  }
}

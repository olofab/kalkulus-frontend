import { Check, Mail, Pencil, X } from 'lucide-react'

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'accepted':
      return {
        color: '#D5EBDD',
        icon: <Check size={16} strokeWidth={2} />,
        label: 'Godkjent',
      }
    case 'sent':
      return {
        color: '#DCEAFB',
        icon: <Mail size={16} strokeWidth={2} />,
        label: 'Sendt',
      }
    case 'rejected':
      return {
        color: '#FBE3E3',
        icon: <X size={16} strokeWidth={2} />,
        label: 'Avvist',
      }
    case 'draft':
    default:
      return {
        color: '#E0E0E0',
        icon: <Pencil size={16} strokeWidth={2} />,
        label: 'Kladd',
      }
  }
}
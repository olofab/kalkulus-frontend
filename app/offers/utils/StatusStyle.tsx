import { Check, Mail, Pencil, X, Clock, CheckCircle } from 'lucide-react'

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'ACCEPTED':
      return {
        color: '#D5EBDD',
        icon: <Check size={16} strokeWidth={2} />,
        label: 'Godkjent',
      }
    case 'PENDING':
      return {
        color: '#DCEAFB',
        icon: <Mail size={16} strokeWidth={2} />,
        label: 'Sendt',
      }
    case 'REJECTED':
      return {
        color: '#FBE3E3',
        icon: <X size={16} strokeWidth={2} />,
        label: 'Avvist',
      }
    case 'EXPIRED':
      return {
        color: '#FFF3CD',
        icon: <Clock size={16} strokeWidth={2} />,
        label: 'Utløpt',
      }
    case 'COMPLETED':
      return {
        color: '#C8E6C9',
        icon: <CheckCircle size={16} strokeWidth={2} />,
        label: 'Fullført',
      }
    case 'DRAFT':
    default:
      return {
        color: '#E0E0E0',
        icon: <Pencil size={16} strokeWidth={2} />,
        label: 'Kladd',
      }
  }
}
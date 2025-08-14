import { useQuery } from '@tanstack/react-query'
import { OfferResponse } from '../../types/offer'
import { apiGet } from '../../lib/api'


export const useOffers = () => {
  return useQuery<OfferResponse[]>({
    queryKey: ['offers'],
    queryFn: () => apiGet('/api/offers'),
  })
}

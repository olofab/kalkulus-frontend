import { useQuery } from '@tanstack/react-query'
import { Item } from '../../types/offer'
import { apiGet } from '../../lib/api'


export function useOfferItems(offerId?: string | number) {
  return useQuery<Item[]>({
    queryKey: ['offer-items', offerId],
    queryFn: () => apiGet(`/api/offers/${offerId}/items`),
    enabled: !!offerId,
  })
}

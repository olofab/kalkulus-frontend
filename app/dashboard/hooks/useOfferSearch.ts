// lib/hooks/useOfferSearch.ts
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../../lib/api'

export const useOfferSearch = (query: string) => {
  return useQuery({
    queryKey: ['search-offers', query],
    queryFn: () => apiGet('/api/offers/search?query=' + query),
    enabled: query.length > 1,
  })
}

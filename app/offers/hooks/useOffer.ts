'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchOffer } from '../../lib/api'
import { Offer } from '../../types/offer'


export function useOffer(offerId?: string | number) {
  const numericId =
    typeof offerId === 'string' ? parseInt(offerId, 10) : offerId

  const query = useQuery<Offer, Error>({
    queryKey: ['offer', numericId],
    queryFn: () => {
      if (!numericId) throw new Error('Invalid offer ID')
      return fetchOffer(numericId)
    },
    enabled: !!numericId, // only fetch if we have a valid ID
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })

  return {
    offer: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}

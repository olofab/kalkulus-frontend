'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchOfferHistory } from '../../lib/api'
import { OfferHistory } from '../../types/history'

export function useOfferHistory(offerId?: string | number) {
  const numericId = typeof offerId === 'string' ? parseInt(offerId, 10) : offerId

  const query = useQuery<OfferHistory, Error>({
    queryKey: ['offer-history', numericId],
    queryFn: () => {
      if (!numericId) throw new Error('Invalid offer ID')
      return fetchOfferHistory(numericId)
    },
    enabled: !!numericId,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  })

  return {
    history: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}

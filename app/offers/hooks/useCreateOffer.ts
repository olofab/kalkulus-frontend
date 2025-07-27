// hooks/useCreateOffer.ts
import { useMutation } from '@tanstack/react-query'
import { apiPost } from '../../lib/api'
import { NewOfferPayload, OfferResponse } from '../../types/offer'


export function useCreateOffer() {
  return useMutation<OfferResponse, Error, NewOfferPayload>({
    mutationFn: (data) => apiPost('/api/offers', data),
  })
}

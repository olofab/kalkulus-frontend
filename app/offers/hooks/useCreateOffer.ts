// hooks/useCreateOffer.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiPost } from '../../lib/api'
import { NewOfferPayload, OfferResponse } from '../../types/offer'
import { useRouter } from 'next/navigation'


export function useCreateOffer() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<OfferResponse, Error, NewOfferPayload>({
    mutationFn: (data) => apiPost('/api/offers', data),
    onSuccess: (newOffer) => {
      // Invaliderer cache for tilbudsliste
      queryClient.invalidateQueries({ queryKey: ['offers'] })

      // Navigerer til den nye tilbudssiden
      router.push(`/offers/${newOffer.id}`)
    },
    onError: (error) => {
      console.error('Feil ved oppretting av tilbud:', error)
    }
  })
}

// hooks/useCreateCategory.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiPost } from '../../lib/api'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) =>
      apiPost('/api/categories', { name }),

    onSuccess: () => {
      // Oppdaterer kategori-cache
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

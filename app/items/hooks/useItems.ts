import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPut, apiDelete } from '../../lib/api'
import { Category, ItemTemplate } from '../../types/itemTemplates'

export const useItems = () => {
  return useQuery<ItemTemplate[]>({
    queryKey: ['items'],
    queryFn: () => apiGet('/api/items/templates'),
  })
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => apiGet('/api/categories'),
  })
}

export const useCreateItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => apiPost('/api/items/templates', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) =>
      apiPut(`/api/items/templates/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiDelete(`/api/items/templates/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}

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
    mutationFn: (data: { name: string, unitPrice: number, categoryId: number }) => {
      // Transform categoryId to categoryIds array for new API format
      const payload = {
        name: data.name,
        unitPrice: data.unitPrice,
        categoryIds: [data.categoryId]
      }
      return apiPost('/api/items/templates', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      queryClient.invalidateQueries({ queryKey: ['item-templates'] })
    },
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

export const useUpdateOfferItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ offerId, itemId, data }: { offerId: string, itemId: number, data: any }) => {
      console.log('Updating offer item with data:', data);

      if (data.quantity !== undefined) {
        // Use correct endpoint for quantity updates (plural "items")
        console.log('Trying quantity update via correct endpoint');
        return await apiPut(`/api/offers/${offerId}/items/${itemId}`, data);
      } else {
        // Use category endpoint (singular "item") 
        console.log('Trying category update via legacy endpoint');
        return await apiPut(`/api/offers/${offerId}/item/${itemId}`, data);
      }
    },
    onSuccess: (_, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offer-items'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      queryClient.invalidateQueries({ queryKey: ['offer', parseInt(offerId)] })
    },
  })
}

export const useDeleteOfferItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ offerId, itemId }: { offerId: string, itemId: number }) =>
      apiDelete(`/api/offers/${offerId}/items/${itemId}`),
    onSuccess: (_, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offer-items'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      queryClient.invalidateQueries({ queryKey: ['offer', parseInt(offerId)] })
    },
  })
}

export const useAddTemplateToOffer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ offerId, templateId, quantity = 1 }: { offerId: string, templateId: number, quantity?: number }) =>
      apiPost(`/api/offers/${offerId}/item/template`, { templateId, quantity }),
    onSuccess: (_, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offer-items'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      queryClient.invalidateQueries({ queryKey: ['offer', parseInt(offerId)] })
    },
  })
}

export const useAddCustomItemToOffer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ offerId, name, unitPrice, quantity, categoryId }: {
      offerId: string,
      name: string,
      unitPrice: number,
      quantity: number,
      categoryId?: number | null
    }) =>
      apiPost(`/api/offers/${offerId}/item/custom`, { name, unitPrice, quantity, categoryId }),
    onSuccess: (_, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offer-items'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      queryClient.invalidateQueries({ queryKey: ['offer', parseInt(offerId)] })
    },
  })
}

export const useAddItemToOffer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ offerId, item }: { offerId: string, item: any }) =>
      apiPost(`/api/offers/${offerId}/item`, item),
    onSuccess: (_, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offer-items'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      queryClient.invalidateQueries({ queryKey: ['offer', parseInt(offerId)] })
    },
  })
}

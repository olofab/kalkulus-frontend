'use client'

import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import { getItemCategories, getItemsByCategory, addOfferItem } from '../lib/api'

// Types
export type Category = {
  id: number;
  name: string;
  count?: number
}

export type Item = {
  id: number;
  name: string;
  unitPrice: number;
  categories: Category[];
  icon?: string
}

export type AddItemPayload = {
  offerId: number;
  itemId: number;
  quantity: number
}

interface ItemsResponse {
  items: Item[]
  nextPage?: number
  total: number
}

interface UseItemsByCategoryParams {
  categoryId?: number
  search?: string
  page?: number
  size?: number
}

// Hook for fetching all categories
export function useItemCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getItemCategories(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (was cacheTime)
  })
}

// Hook for fetching items by category with search and pagination
export function useItemsByCategory(params: UseItemsByCategoryParams) {
  const { categoryId, search, page = 1, size = 20 } = params

  const queryKey = ['items-by-category', categoryId, search, page]

  const queryParams = new URLSearchParams()
  if (categoryId) queryParams.append('categoryId', categoryId.toString())
  if (search) queryParams.append('q', search)
  queryParams.append('page', page.toString())
  queryParams.append('size', size.toString())

  const query = useQuery({
    queryKey,
    queryFn: (): Promise<ItemsResponse> => getItemsByCategory({ categoryId, search }),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  return {
    data: query.data?.items || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    hasNextPage: !!query.data?.nextPage,
    fetchNextPage: () => {
      // This would be used with infinite query in a real implementation
      // For now, we'll handle pagination manually
    },
    refetch: query.refetch,
    total: query.data?.total || 0
  }
}

// Hook for adding item to offer
export function useAddOfferItem(offerId: number): UseMutationResult<any, Error, { itemId: number; quantity: number }> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      addOfferItem({ offerId, itemId, quantity }),
    onSuccess: () => {
      // Invalidate offer-related queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['offers', offerId] })
      queryClient.invalidateQueries({ queryKey: ['offerItems', offerId] })
    },
  })
}

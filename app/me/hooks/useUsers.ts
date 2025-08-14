import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPut } from '../../lib/api'
import { User } from '../../types/user'


export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => apiGet('/api/admin/users')
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newUser: any) => apiPost('/api/admin/users', newUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) =>
      apiPut(`/api/admin/users/${id}`, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })
}
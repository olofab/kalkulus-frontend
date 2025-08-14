// app/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query'
import { useAppContext } from '../../lib/AppContext';
import { apiPost } from '../../lib/api';


export function useLogin() {
  const { refreshUser } = useAppContext()

  const mutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // Step 1: Check how many companies user has
      const res = await apiPost('/api/auth/email-check', { email })

      // Step 2: If multiple companies, return them for next step
      if (Array.isArray(res)) {
        return { requiresCompanySelection: true, companies: res }
      }

      // Step 3: Log in directly
      const loginRes = await apiPost('/api/auth/login', {
        email,
        password,
        companyId: res.companyId,
      })

      localStorage.setItem('token', loginRes.token)
      await refreshUser()

      return { success: true }
    }
  })

  const loginWithCompany = useMutation({
    mutationFn: async ({ email, password, companyId }: { email: string; password: string; companyId: number }) => {
      const loginRes = await apiPost('/api/auth/login', {
        email,
        password,
        companyId,
      })

      localStorage.setItem('token', loginRes.token)
      await refreshUser()

      return { success: true }
    }
  })

  return {
    login: mutation,
    loginWithCompany,
  }
}

import { useState } from 'react'
import { sendOfferEmail, SendOfferEmailRequest, SendOfferEmailResponse } from '../../lib/api'
import { validateEmail, validateSubject } from '../../lib/validation'

interface UseSendOfferEmailOptions {
  onSuccess?: (response: SendOfferEmailResponse) => void
  onError?: (error: string) => void
}

interface SendEmailFormData {
  email: string
  subject?: string
  message?: string
}

export const useSendOfferEmail = (offerId: string, options?: UseSendOfferEmailOptions) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendEmail = async (formData: SendEmailFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate form data
      const emailError = validateEmail(formData.email)
      if (emailError) {
        throw new Error(emailError)
      }

      const subjectError = validateSubject(formData.subject || '')
      if (subjectError) {
        throw new Error(subjectError)
      }

      // Prepare request data
      const requestData: SendOfferEmailRequest = {
        email: formData.email.trim()
      }

      // Add optional fields if provided
      if (formData.subject?.trim()) {
        requestData.subject = formData.subject.trim()
      }

      if (formData.message?.trim()) {
        requestData.message = formData.message.trim()
      }

      // Send email
      const response = await sendOfferEmail(offerId, requestData)

      if (!response.success) {
        throw new Error(response.message || 'Kunne ikke sende e-post')
      }

      // Call success callback
      options?.onSuccess?.(response)

      return response
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Kunne ikke sende e-post. Prøv igjen.'
      setError(errorMessage)
      options?.onError?.(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    sendEmail,
    isLoading,
    error,
    clearError
  }
}

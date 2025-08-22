/**
 * Validation utility functions
 */

/**
 * Validates an email address using RFC 5322 standard
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email.trim())
}

/**
 * Validates email and returns error message if invalid
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'E-postadresse er påkrevd'
  }

  if (!isValidEmail(email)) {
    return 'Ugyldig e-postadresse'
  }

  return null
}

/**
 * Validates if a string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Validates subject line (optional but if provided, should not be empty)
 */
export const validateSubject = (subject: string): string | null => {
  if (subject && !isNotEmpty(subject)) {
    return 'Emne kan ikke være tomt hvis det er oppgitt'
  }
  return null
}

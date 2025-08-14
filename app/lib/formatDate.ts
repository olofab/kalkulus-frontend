// lib/formatDate.ts
import dayjs from 'dayjs'
import 'dayjs/locale/nb'

dayjs.locale('nb') // Default to Norwegian

export function formatDate(dateString: string, format = 'D. MMMM YYYY', locale = 'nb') {
  return dayjs(dateString).locale(locale).format(format)
}

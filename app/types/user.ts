export type User = {
  id: number
  name: string
  email: string
  password: string
  isAdmin: boolean
  userType: string
}

export type UserType = 'INTERNAL' | 'SUBCONTRACTOR'

export enum UserTypeEnum {
  INTERNAL = 'INTERNAL',
  SUBCONTRACTOR = 'SUBCONTRACTOR',
  ADMIN = 'ADMIN',
}

export type Company = {
  id: number
  name: string
  organizationNumber: string
  industry: string
  hourlyRate: number
  machineRate: number
  fuelRate: number
  vat: number
}
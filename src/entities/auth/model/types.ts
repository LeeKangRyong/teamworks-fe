export type { User, UserRole } from '@/shared/types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}

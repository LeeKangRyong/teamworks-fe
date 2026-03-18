export type UserRole = 'MANAGER' | 'PARTICIPANT'

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}

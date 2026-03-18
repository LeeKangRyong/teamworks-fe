export type UserRole = 'MANAGER' | 'PARTICIPANT'

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
}

export interface ApiError {
  message: string
  status: number
}

export interface AuthHeaders {
  [key: string]: string | undefined
  Authorization?: string
  'X-Manager-ID'?: string
  'X-User-ID'?: string
}

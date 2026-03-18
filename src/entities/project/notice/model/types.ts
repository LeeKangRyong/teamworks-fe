export type ChatUserType = 'manager' | 'student' | 'team'

export interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  date: string
  isRead: boolean
  isMine?: boolean
  isFile?: boolean
  fileSize?: string
}

export interface Chat {
  id: string
  userId: string
  userType: ChatUserType
  badge?: number
  messages: Message[]
}
